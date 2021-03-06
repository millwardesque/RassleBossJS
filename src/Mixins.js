let dollarsFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
});

let percentFormatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
});

let plainFormatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
});

export default {
    methods: {
        formatCurrency: function(number) {
            return dollarsFormatter.format(number);
        },
        formatPercent: function(number) {
            return percentFormatter.format(number);
        },
        formatPlainNumber: function(number) {
            return plainFormatter.format(number);
        },

        /**
         * Generic sort by name-property on a set of objects
         */
        nameSort: function(a, b) {
            if (a.name < b.name) {
                return -1;
            }
            else if (a.name > b.name) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
}
