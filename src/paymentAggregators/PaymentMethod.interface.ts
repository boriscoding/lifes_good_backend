export interface PaymentMethodConfig {
  name: string;
  slug: string;
  enabled: boolean;
  config: Record<string, string>;
}

export interface PaymentMethodInterface {
  getConfig(): PaymentMethodConfig;
  validateCredentials(): Promise<boolean>;
}