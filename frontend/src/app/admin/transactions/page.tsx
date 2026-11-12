"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Modal } from "@/components/ui/Modal";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import {
  adminService,
  type AdminTransaction,
  type PayosProof,
  type TransactionProofCheck,
} from "@/features/admin/services/adminService";
import { ArrowRight, CheckCircle2, Loader2, RefreshCw, Search, ShieldCheck, XCircle } from "lucide-react";

const money = (n?: number | null) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n || 0);
const date = (v?: string | null) => (v ? new Date(v).toLocaleString("vi-VN") : "—");

const STATUS_LABEL: Record<string, { text: string; className: string }> = {
  success: { text: "Thành công", className: "bg-emerald-50 text-emerald-700" },
  failed: { text: "Thất bại", className: "bg-rose-50 text-rose-700" },
  pending: { text: "Đang chờ", className: "bg-amber-50 text-amber-700" },
};

const SOURCE_LABEL: Record<PayosProof["source"], string> = {
  payos_webhook: "Webhook PayOS",
  payos_api: "API PayOS (tra trực tiếp)",
  none: "Chưa có dữ liệu PayOS",
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_LABEL[status] ?? STATUS_LABEL.pending;
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${s.className}`}>{s.text}</span>;
}

const NOT_PROVIDED = "Ngân hàng không cung cấp";

function SenderCell({ proof }: { proof: PayosProof }) {
  if (proof.source === "none") return <span className="text-xs text-stone-400">—</span>;
  const { name, account, bankName } = proof.sender;
  if (!name && !account && !bankName) return <span className="text-xs text-stone-400">{NOT_PROVIDED}</span>;
  return (
    <div>
      <div className="font-medium text-stone-800">{name || NOT_PROVIDED}</div>
      <div className="text-xs text-stone-500">
        {[bankName, account].filter(Boolean).join(" · ") || NOT_PROVIDED}
      </div>
    </div>
  );
}

function Field({ label, value, mono = false }: { label: string; value?: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm">
      <span className="text-stone-500 shrink-0">{label}</span>
      <span className={`text-right text-stone-800 ${mono ? "font-mono text-xs" : "font-medium"}`}>
        {value ?? <span className="text-stone-400 font-normal">{NOT_PROVIDED}</span>}
      </span>
    </div>
  );
}

function MatchBadge({ ok, label }: { ok: boolean | null; label: string }) {
  if (ok === null) return null;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
        ok ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
      }`}
    >
      {ok ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
      {label}: {ok ? "khớp" : "lệch"}
    </span>
  );
}

/** Chứng thực chuyển tiền: ai chuyển, chuyển cho ai, mã tham chiếu ngân hàng. */
function ProofDetails({ proof }: { proof: PayosProof }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="rounded-xl border border-stone-200 p-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">Người chuyển</div>
          <div className="mt-1 font-semibold text-stone-900">{proof.sender.name || NOT_PROVIDED}</div>
          <div className="text-xs text-stone-500">
            {[proof.sender.bankName, proof.sender.account].filter(Boolean).join(" · ") || NOT_PROVIDED}
          </div>
        </div>
        <ArrowRight className="mx-auto hidden h-5 w-5 text-emerald-600 sm:block" />
        <div className="rounded-xl border border-stone-200 p-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">Người nhận</div>
          <div className="mt-1 font-semibold text-stone-900">{proof.receiver.name || "Chưa khai trong .env"}</div>
          <div className="text-xs text-stone-500">
            {[proof.receiver.bank, proof.receiver.account].filter(Boolean).join(" · ") || "—"}
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-stone-50 px-4 py-2">
        <Field label="Trạng thái PayOS" value={proof.payosStatus} />
        <Field label="Số tiền đã nhận" value={proof.amountPaid !== null ? money(proof.amountPaid) : null} />
        <Field label="Mã tham chiếu ngân hàng" value={proof.reference} mono />
        <Field label="Thời điểm chuyển" value={proof.transactionDateTime} />
        <Field label="Nội dung chuyển khoản" value={proof.description} />
        <Field label="Mã link thanh toán PayOS" value={proof.paymentLinkId} mono />
        <Field label="Nguồn dữ liệu" value={SOURCE_LABEL[proof.source]} />
      </div>
    </div>
  );
}

function ProofModal({ tx, onClose }: { tx: AdminTransaction | null; onClose: () => void }) {
  const [check, setCheck] = useState<TransactionProofCheck | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const verify = useCallback(async (orderCode: string) => {
    setLoading(true);
    setError("");
    setCheck(null);
    try {
      setCheck(await adminService.fetchTransactionProof(orderCode));
    } catch (err) {
      setError((err as Error)?.message || "Không đối soát được với PayOS. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (tx) void verify(tx.gateway_txn_ref);
  }, [tx, verify]);

  if (!tx) return null;
  return (
    <Modal isOpen={!!tx} onClose={onClose} title={`Chứng thực đơn #${tx.gateway_txn_ref}`} className="max-w-2xl">
      <div className="space-y-5 overflow-y-auto pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <div>
            <div className="font-medium text-stone-800">{tx.user?.full_name || `Thành viên #${tx.user_id}`}</div>
            <div className="text-xs text-stone-500">{tx.user?.email}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{money(tx.amount)}</span>
            <StatusBadge status={tx.status} />
          </div>
        </div>

        {loading && (
          <div className="flex items-center gap-2 rounded-xl bg-stone-50 p-4 text-sm text-stone-600">
            <Loader2 className="h-4 w-4 animate-spin" /> Đang tra cứu trực tiếp trên PayOS…
          </div>
        )}
        {error && <div className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}

        {check && (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                {check.message} · {date(check.checked_at)}
              </span>
              {check.consistency && (
                <>
                  <MatchBadge ok={check.consistency.status_matches} label="Trạng thái" />
                  <MatchBadge ok={check.consistency.amount_matches} label="Số tiền" />
                </>
              )}
            </div>
            {check.proof ? (
              <ProofDetails proof={check.proof} />
            ) : (
              <p className="text-sm text-stone-500">
                PayOS không trả dữ liệu cho mã đơn này (đơn demo hoặc đơn đã bị xoá phía PayOS).
              </p>
            )}
            {check.payos_raw != null && (
              <details className="rounded-xl border border-stone-200">
                <summary className="cursor-pointer px-4 py-2.5 text-sm font-medium text-stone-700">
                  Dữ liệu gốc PayOS trả về (JSON, đã che số tài khoản người chuyển)
                </summary>
                <pre className="max-h-72 overflow-auto border-t border-stone-100 bg-stone-950 p-4 text-xs leading-relaxed text-emerald-200">
                  {JSON.stringify(check.payos_raw, null, 2)}
                </pre>
              </details>
            )}
          </>
        )}

        {!loading && (
          <button
            onClick={() => void verify(tx.gateway_txn_ref)}
            className="inline-flex h-9 items-center gap-2 rounded-xl border border-stone-200 px-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            <RefreshCw className="h-4 w-4" /> Đối soát lại
          </button>
        )}
      </div>
    </Modal>
  );
}

function TransactionsContent() {
  const [rows, setRows] = useState<AdminTransaction[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [gateway, setGateway] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<AdminTransaction | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setRows(
        await adminService.fetchTransactions({
          search: search || undefined,
          status: status || undefined,
          gateway: gateway || undefined,
        }),
      );
    } catch {
      setError("Không tải được lịch sử giao dịch. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, [search, status, gateway]);

  useEffect(() => {
    const timer = setTimeout(() => void load(), 250);
    return () => clearTimeout(timer);
  }, [load]);

  const headers = ["Thành viên", "Người chuyển (PayOS)", "Số tiền", "Mã đơn / Tham chiếu", "Trạng thái", "Thời gian", ""];

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Quản trị hệ thống"
        title="Lịch sử giao dịch"
        subtitle="Theo dõi ai đã chuyển khoản nâng cấp Premium. Thông tin người chuyển, người nhận và mã tham chiếu lấy từ PayOS; bấm Đối soát để tra trực tiếp trên PayOS."
      />
      <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
        <div className="flex flex-col gap-3 md:flex-row">
          <label className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm tên, email, mã đơn hoặc mã tham chiếu"
              className="h-10 w-full rounded-xl border border-stone-200 pl-9 pr-3 text-sm outline-none focus:border-emerald-500"
            />
          </label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 rounded-xl border border-stone-200 px-3 text-sm">
            <option value="">Mọi trạng thái</option>
            <option value="success">Thành công</option>
            <option value="pending">Đang chờ</option>
            <option value="failed">Thất bại</option>
          </select>
          <select value={gateway} onChange={(e) => setGateway(e.target.value)} className="h-10 rounded-xl border border-stone-200 px-3 text-sm">
            <option value="">Mọi cổng</option>
            <option value="PAYOS">PayOS</option>
            <option value="VNPAY">VNPay</option>
          </select>
          <button
            onClick={() => void load()}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white"
          >
            <RefreshCw className="h-4 w-4" />
            Làm mới
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-stone-50 text-xs uppercase text-stone-500">
              <tr>
                {headers.map((h) => (
                  <th key={h} className="px-4 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={headers.length} className="p-8 text-center text-stone-500">
                    Đang tải giao dịch…
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={headers.length} className="p-8 text-center text-rose-600">
                    {error}
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={headers.length} className="p-8 text-center text-stone-500">
                    Chưa có giao dịch phù hợp.
                  </td>
                </tr>
              ) : (
                rows.map((tx) => {
                  // Chỉ đơn PayOS có orderCode dạng số mới tra được trên PayOS (đơn demo "DIRECT_..." thì không).
                  const canVerify = tx.gateway === "PAYOS" && /^\d+$/.test(tx.gateway_txn_ref);
                  return (
                    <tr key={tx.transaction_id} className="hover:bg-stone-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-stone-800">{tx.user?.full_name || `Thành viên #${tx.user_id}`}</div>
                        <div className="text-xs text-stone-500">{tx.user?.email || ""}</div>
                      </td>
                      <td className="px-4 py-3">
                        <SenderCell proof={tx.proof} />
                      </td>
                      <td className="px-4 py-3 font-semibold">{money(tx.amount)}</td>
                      <td className="px-4 py-3 font-mono text-xs">
                        {tx.gateway_txn_ref}
                        {tx.proof.reference && <div className="text-stone-400">Ref: {tx.proof.reference}</div>}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={tx.status} />
                      </td>
                      <td className="px-4 py-3 text-xs text-stone-600">
                        <div>Tạo: {date(tx.created_at)}</div>
                        <div>Trả: {date(tx.paid_at)}</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {canVerify ? (
                          <button
                            onClick={() => setSelected(tx)}
                            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                          >
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Đối soát PayOS
                          </button>
                        ) : (
                          <span className="text-xs text-stone-400">Đơn demo</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-stone-500">
          Hiển thị tối đa 500 giao dịch gần nhất. Số tài khoản người chuyển được che, chỉ hiện 4 số cuối.
        </p>
      </section>
      <ProofModal tx={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default function AdminTransactionsPage() {
  const { isGuest, isMember, ready } = useRole();
  return (
    <AppShell showRightRail={false}>
      <div className="mx-auto w-full max-w-[1240px]">
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : isMember ? (
          <LockedState reason="forbidden" />
        ) : (
          <TransactionsContent />
        )}
      </div>
    </AppShell>
  );
}
