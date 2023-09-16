///** @odoo-module */
import { Gui } from 'point_of_sale.Gui';
import Registries from 'point_of_sale.Registries';
import PaymentScreen from 'point_of_sale.PaymentScreen';

const PurchasePaymentScreen = (PaymentScreen) =>
class PurchasePaymentScreen extends PaymentScreen {

  async validateOrder() {
    const order = this.env.pos.get_order();
    const selected_paymentline = order.selected_paymentline;
    const session = this.env.pos.pos_session;

    if (!order.partner) {
        Gui.showPopup('ErrorPopup', {
            title: 'Select a Customer',
            body: 'Please select a customer before proceeding with payment.',
        });
        return;
    } else {
    if(order.partner.purchase_limit){
        const session_id = session.id;
        const partner_id = order.partner.id;

        const totalAmount =selected_paymentline.amount+ await this.rpc({
            model: 'pos.session',
            method: 'get_customer_order_total',
            args: [session_id, partner_id],
        });

        if (selected_paymentline && selected_paymentline.amount) {
//             totalAmount += selected_paymentline.amount;
        }

        if (order.partner && order.partner.amount < totalAmount) {
            Gui.showPopup('ErrorPopup', {
                title: 'Limit Exceeded',
                body: 'Purchase limit of Customer exceeds.',
            });
            return;
        }
    }

    }

    super.validateOrder();
}

}

Registries.Component.extend(PaymentScreen, PurchasePaymentScreen);
//

//  async validateOrder() {
//    const order = this.env.pos.get_order();
//    console.log('order',order)
//    const selected_paymentline = order.selected_paymentline;
//    const session = this.env.pos.pos_session;
//    console.log('session',session)
//    if (!order.partner) {
//      Gui.showPopup('ErrorPopup', {
//        title: 'Select a Customer',
//        body: 'Please select a customer before proceeding with payment.',
//      });
//      return;
//    }
//    else{
//      const orders = this.env.pos.get_order_list();
//      let amount_total = 0;
//      for (const order of orders) {
//      if (order.partner && order.partner.id === order.partner.id) {
//
//        amount_total += order.get_total_with_tax();
//      }
//      }
//      if (selected_paymentline && selected_paymentline.amount) {
////        amount_total += selected_paymentline.amount;
//      }
//      console.log('new',amount_total)
//      if(order.partner && order.partner.amount<amount_total)
//      {
//        Gui.showPopup('ErrorPopup', {
//          title: 'Limit Exceeded',
//          body: 'Purchase limit of Customer exceeds.',
//        });
//        return;
//      }
//    }
//    super.validateOrder();
//  }
//}
//
//Registries.Component.extend(PaymentScreen, PurchasePaymentScreen);
//import { Gui } from 'point_of_sale.Gui';
//import Registries from 'point_of_sale.Registries';
//import PaymentScreen from 'point_of_sale.PaymentScreen';
//
//const PurchasePaymentScreen = (PaymentScreen) =>
//class PurchasePaymentScreen extends PaymentScreen {
//  // Override the validateOrder function to check the purchase limit
//  async validateOrder() {
//    const order = this.env.pos.get_order();
//    console.log('order',order)
//    const selected_paymentline = order.selected_paymentline;
//    const session = this.env.pos.pos_session;
////    const orders = this.env.pos.get_order_list()
////    console.log('orderlist',orders)
//    console.log('session',session)
//    if (!order.partner) {
//      Gui.showPopup('ErrorPopup', {
//        title: 'Select a Customer',
//        body: 'Please select a customer before proceeding with payment.',
//      });
//      return;
//      }
//    else{
//    if(order.partner && order.partner.amount<selected_paymentline.amount)
//    {Gui.showPopup('ErrorPopup', {
//        title: 'Limit Exceeded',
//        body: 'Purchase limit of Customer exceeds.',
//      });
//      return;
//    }
//    }
//  super.validateOrder();
//  }
//}
//
//Registries.Component.extend(PaymentScreen, PurchasePaymentScreen);
//
//
