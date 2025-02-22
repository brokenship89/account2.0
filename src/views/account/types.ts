// 账户相关的类型定义
export interface AccountInfo {
  id: number;
  username: string;
  email: string;
  [key: string]: any; // 允许扩展其他字段
}

// 账户模块配置选项
export interface AccountModuleOptions {
  title?: string;
  showHeader?: boolean;
  readonly?: boolean;
  fields?: string[];
}

// 验证规则类型
export interface ValidationRule {
  required?: boolean;
  message?: string;
  type?: string;
  pattern?: RegExp;
  validator?: (value: any) => boolean | Promise<boolean>;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AccountInfo | null;
  token: string | null;
} 