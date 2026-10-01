import { PaymentGatewayInterface } from './PaymentGateway.interface';
import { MtnMobileMoneyGateway } from './MtnMobileMoney.gateway';
import { OrangeMoneyGateway } from './OrangeMoney.gateway';
import { CreditCardGateway } from './CreditCard.gateway';
import { CashGateway } from './Cash.gateway';

export class PaymentFactory {
  private static instances: Map<string, PaymentGatewayInterface> = new Map();

  static getGateway(method: string): PaymentGatewayInterface {
    if (this.instances.has(method)) {
      return this.instances.get(method)!;
    }

    let gateway: PaymentGatewayInterface;

    switch (method) {
      case 'mtn_mobile_money':
        gateway = new MtnMobileMoneyGateway();
        break;
      case 'orange_money':
        gateway = new OrangeMoneyGateway();
        break;
      case 'credit_card':
        gateway = new CreditCardGateway();
        break;
      case 'cash':
        gateway = new CashGateway();
        break;
      default:
        throw new Error(`Methode de paiement inconnue: ${method}`);
    }

    this.instances.set(method, gateway);
    return gateway;
  }
}