"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Upload,
  FileSpreadsheet,
  Download,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  RefreshCw,
  Check,
} from "lucide-react";
import { excelImportService } from "../services/excelImportService";
import { adminRecipeApiService } from "@/features/admin/services/adminRecipeApiService";

interface AdminImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleted: () => void;
  onOpenExport?: () => void;
}

interface ImportBatchData {
  batch_id: number;
  total_rows: number;
  success_count: number;
  failed_count: number;
  file_name: string;
  created_at: string;
}

interface ImportItemData {
  import_item_id?: number;
  row_number: number;
  recipe_title: string;
  status: "SUCCESS" | "FAILED" | "SKIPPED" | "success" | "failed" | "skipped";
  fail_reason?: string;
  fail_detail?: string;
  recipe_id?: number;
}

export function AdminImportModal({
  isOpen,
  onClose,
  onCompleted,
  onOpenExport,
}: AdminImportModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [batch, setBatch] = useState<ImportBatchData | null>(null);
  const [items, setItems] = useState<ImportItemData[]>([]);
  const [filterTab, setFilterTab] = useState<"all" | "success" | "failed">("all");
  const [uploadError, setUploadError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setIsProcessing(true);

    try {
      // Gửi file trực tiếp tới backend NestJS: POST /api/v1/admin/recipe-imports
      const res = await adminRecipeApiService.importRecipeExcel(file);
      const resData = res?.data || res;
      setBatch(resData.batch || null);
      setItems(resData.items || []);
      onCompleted();
    } catch (err: unknown) {
      const msg = (err as Error).message || "Định dạng file không hợp lệ hoặc không thể kết nối tới server.";
      setUploadError(msg);
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFinish = () => {
    onCompleted();
    onClose();
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const handleClose = () => {
    if (batch && typeof window !== "undefined") {
      onCompleted();
      onClose();
      window.location.reload();
      return;
    }
    onClose();
  };

  const filteredItems = items.filter((item) => {
    const s = (item.status || "").toLowerCase();
    if (filterTab === "all") return true;
    if (filterTab === "success") return s === "success";
    if (filterTab === "failed") return s === "failed" || s === "skipped";
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Nhập công thức từ Excel (Lưu vào Database thật)
              </h3>
              <p className="text-xs text-stone-500">
                Tự động kiểm tra từng trường dữ liệu, nguyên liệu kỵ nhau và lưu trực tiếp vào cơ sở dữ liệu
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">



            <button
              type="button"
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* File Upload Drop Area */}
          <div className="p-6 rounded-3xl border-2 border-dashed border-stone-200 bg-stone-50/50 hover:bg-emerald-50/20 hover:border-emerald-300 transition-all text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="hidden"
              id="excel-file-input"
            />
            <label
              htmlFor="excel-file-input"
              className="cursor-pointer flex flex-col items-center justify-center space-y-2"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-center text-emerald-700">
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-stone-800">
                  {isProcessing
                    ? "Đang tải lên, xác thực từng dòng và lưu vào Database..."
                    : "Nhấn để tải lên tệp Excel (.xlsx)"}
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  Hỗ trợ tiêu đề tiếng Việt chuẩn: Tên món, Mô tả, Hướng dẫn, Bữa ăn, Chế độ ăn chay, Nguyên liệu, Danh mục (1 nhóm món + 1 loại món)
                </p>
              </div>
            </label>
          </div>

          {/* Upload Error Alert */}
          {uploadError && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2.5">
              <AlertOctagon className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Lỗi không thể nhập dữ liệu từ file:</p>
                <p className="mt-0.5 leading-relaxed">{uploadError}</p>
              </div>
            </div>
          )}

          {/* Result of the Batch */}
          {batch && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900">
                    Kết quả nhập dữ liệu (Lô #{batch.batch_id} · {batch.file_name})
                  </h4>
                  <p className="text-xs text-stone-500">
                    Các món ăn hợp lệ đã được lưu thành công vào cơ sở dữ liệu hệ thống
                  </p>
                </div>

                <button
                  onClick={handleFinish}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  Hoàn tất & Cập nhật danh sách
                </button>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3.5 rounded-2xl bg-stone-100 border border-stone-200">
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Tổng số công thức</span>
                  <span className="font-serif font-bold text-2xl text-stone-900">
                    {batch.total_rows}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-emerald-700 block text-[10px] uppercase font-bold">Nhập thành công</span>
                  <span className="font-serif font-bold text-2xl text-emerald-800">
                    {batch.success_count}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200">
                  <span className="text-red-700 block text-[10px] uppercase font-bold">Bị lỗi / Từ chối</span>
                  <span className="font-serif font-bold text-2xl text-red-800">
                    {batch.failed_count}
                  </span>
                </div>
              </div>

              {/* Tabs for filtering list */}
              <div className="flex items-center gap-2 text-xs pt-1">
                {[
                  { id: "all", label: `Tất cả (${items.length})` },
                  { id: "success", label: `Thành công (${batch.success_count})` },
                  { id: "failed", label: `Bị từ chối (${batch.failed_count})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterTab(tab.id as typeof filterTab)}
                    className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${filterTab === tab.id
                      ? "bg-stone-900 text-white font-bold"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Detailed Item List */}
              <div className="border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-100 text-xs">
                {filteredItems.map((item, idx) => {
                  const s = (item.status || "").toLowerCase();
                  const isSuccess = s === "success";
                  const isSkipped = s === "skipped";
                  return (
                    <div
                      key={idx}
                      className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors ${
                        isSuccess
                          ? "hover:bg-emerald-50/30"
                          : isSkipped
                          ? "bg-amber-50/30 hover:bg-amber-50/50"
                          : "bg-red-50/30 hover:bg-red-50/50"
                      }`}
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-stone-400 font-mono text-[11px]">
                            Dòng {item.row_number}
                          </span>
                          <span className="font-bold text-stone-900 text-sm">
                            {item.recipe_title}
                          </span>
                          {item.recipe_id && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                              Mã món: #{item.recipe_id}
                            </span>
                          )}
                        </div>

                        {/* Status & Detailed Error */}
                        {isSuccess ? (
                          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Đã xác thực và lưu vào cơ sở dữ liệu thật</span>
                          </div>
                        ) : isSkipped ? (
                          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-0.5 mt-1">
                            <div className="flex items-center gap-1.5 font-bold text-amber-800 text-[11px]">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              <span>Bỏ qua do trùng lặp:</span>
                            </div>
                            <p className="text-[11px] leading-relaxed pl-5 font-medium">
                              {item.fail_detail || item.fail_reason || "Công thức đã tồn tại trong hệ thống."}
                            </p>
                          </div>
                        ) : (
                          <div className="p-2.5 rounded-xl bg-red-100/70 border border-red-200 text-red-900 space-y-0.5 mt-1">
                            <div className="flex items-center gap-1.5 font-bold text-red-800 text-[11px]">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                              <span>Lý do không thể nhập:</span>
                            </div>
                            <p className="text-[11px] leading-relaxed pl-5 font-medium">
                              {item.fail_detail || item.fail_reason || "Dữ liệu không hợp lệ"}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 self-end sm:self-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                            isSuccess
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : isSkipped
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                        >
                          {isSuccess ? "THÀNH CÔNG" : isSkipped ? "ĐÃ BỎ QUA" : "THẤT BẠI"}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {filteredItems.length === 0 && (
                  <div className="p-8 text-center text-stone-400">
                    Không có công thức nào trong danh sách lọc này.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
