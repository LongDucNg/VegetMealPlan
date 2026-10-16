import React, { useState } from "react";
import { Search, Eye, EyeOff } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "search";
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disablePasswordToggle?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      type = "text",
      icon,
      rightIcon,
      disablePasswordToggle = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";
    const effectiveType = isPasswordType && showPassword ? "text" : type;

    if (variant === "search") {
      return (
        <div className={`relative flex items-center w-full ${className}`}>
          <div className="absolute left-4 text-stone-400 pointer-events-none">
            {icon || <Search className="w-[18px] h-[18px]" strokeWidth={1.75} />}
          </div>
          <input
            ref={ref}
            type={effectiveType}
            className="w-full h-11 bg-stone-50 border border-stone-200 rounded-full pl-11 pr-4 text-base text-stone-900 placeholder:text-stone-400 outline-none transition-all focus:border-emerald-600 focus:bg-white focus:ring-1 focus:ring-emerald-600 shadow-xs"
            {...props}
          />
        </div>
      );
    }

    const hasPasswordToggle = isPasswordType && !disablePasswordToggle;

    return (
      <div className={`relative flex items-center w-full ${className}`}>
        {icon && (
          <div className="absolute left-3.5 text-stone-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={effectiveType}
          className={`w-full h-11 bg-white border border-stone-200 rounded-xl px-4 text-base text-stone-900 placeholder:text-stone-400 outline-none transition-all focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-xs ${
            icon ? "pl-11" : ""
          } ${hasPasswordToggle || rightIcon ? "pr-11" : ""}`}
          {...props}
        />
        {hasPasswordToggle ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            disabled={props.disabled}
            className="absolute right-3.5 text-stone-400 hover:text-stone-600 p-1 rounded-md transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 text-stone-500" />
            ) : (
              <Eye className="w-4 h-4 text-stone-400" />
            )}
          </button>
        ) : rightIcon ? (
          <div className="absolute right-3.5 text-stone-400">{rightIcon}</div>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

