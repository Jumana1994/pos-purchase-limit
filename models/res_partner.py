# -*- coding: utf-8 -*-
from odoo import api, fields, models


class ResPartner(models.Model):
    _inherit = 'res.partner'
    purchase_limit = fields.Boolean('Purchase Limit')
    amount = fields.Float(string='Amount')


class PosLimit(models.Model):
    _inherit = 'pos.session'

    def _loader_params_res_partner(self):
        result = super()._loader_params_res_partner()
        result['search_params']['fields'].extend(['purchase_limit', 'amount'])
        return result

    @api.model
    def get_customer_order_total(self, session_id, partner_id):
        session = self.browse(session_id)
        orders = self.env['pos.order'].search([
            ('session_id', '=', session_id),
            ('partner_id', '=', partner_id)
        ])

        return sum(order.amount_total for order in orders)





