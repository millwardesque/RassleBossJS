let dollarsFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
});

export default {
    methods: {
        formatCurrency: function(number) {
            return dollarsFormatter.format(number);
        }
    }
}
