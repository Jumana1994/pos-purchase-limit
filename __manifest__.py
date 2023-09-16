{
    'name': 'POS Purchase limit',
    "version": "16.0.1.0.0",
    'description': 'POS Purchase limit',
    "author": 'Cybrosys',
    'license': 'LGPL-3',
    'category': 'Sales',
    "depends": [
        "base",
        'sale',
        'product',
        'point_of_sale',
    ],
    "data": ['views/res_partner_view.xml',

             ],
    'assets': {
        'point_of_sale.assets': [
            'pos_purchase_limit/static/src/js/payment_screen.js',

        ],

    },
    "auto-install": True,
    "application": True,
    "installable": True,
}
