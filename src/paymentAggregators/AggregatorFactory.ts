import { PaymentAggregator } from './PaymentAggregator.interface';
import { PayDunyaAggregator } from './PayDunya.aggregator';
import { CinetPayAggregator } from './CinetPay.aggregator';
import { OpayAggregator } from './Opay.aggregator';
import { OrangeMoneyAggregator } from './OrangeMoney.aggregator';
import { MtnMoneyAggregator } from './MtnMoney.aggregator';
import { CreditCardAggregator } from './CreditCard.aggregator';

export class AggregatorFactory {
  private static instances: Map<string, PaymentAggregator> = new Map();

  static getAggregator(name: string): PaymentAggregator {
    if (this.instances.has(name)) {
      return this.instances.get(name)!;
    }

    let aggregator: PaymentAggregator;

    switch (name.toLowerCase()) {
      case 'paydunya':
        aggregator = new PayDunyaAggregator();
        break;
      case 'cinetpay':
        aggregator = new CinetPayAggregator();
        break;
      case 'opay':
        aggregator = new OpayAggregator();
        break;
      case 'orange_money':
        aggregator = new OrangeMoneyAggregator();
        break;
      case 'mtn_money':
        aggregator = new MtnMoneyAggregator();
        break;
      case 'credit_card':
        aggregator = new CreditCardAggregator();
        break;
      default:
        throw new Error(`Agregateur inconnu: ${name}`);
    }

    this.instances.set(name, aggregator);
    return aggregator;
  }
}