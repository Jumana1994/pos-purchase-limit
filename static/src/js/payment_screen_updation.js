///** @odoo-module */
import { Gui } from 'point_of_sale.Gui';
import Registries from 'point_of_sale.Registries';
import PaymentScreen from 'point_of_sale.PaymentScreen';

const PurchasePaymentScreen = (PaymentScreen) =>
class PurchasePaymentScreen extends PaymentScreen {
  // Override the validateOrder function to check the purchase limit
  async validateOrder() {
    const order = this.env.pos.get_order();
    console.log('order',order)
    const selected_paymentline = order.selected_paymentline;
    const session = this.env.pos.pos_session;
//    const orders = this.env.pos.get_order_list()
//    console.log('orderlist',orders)
    console.log('session',session)
    if (!order.partner) {
      Gui.showPopup('ErrorPopup', {
        title: 'Select a Customer',
        body: 'Please select a customer before proceeding with payment.',
      });
      return;
      }
    else{
    if(order.partner && order.partner.amount<selected_paymentline.amount)
    {Gui.showPopup('ErrorPopup', {
        title: 'Limit Exceeded',
        body: 'Purchase limit of Customer exceeds.',
      });
      return;
    }
    }
  super.validateOrder();
  }
}

Registries.Component.extend(PaymentScreen, PurchasePaymentScreen);


