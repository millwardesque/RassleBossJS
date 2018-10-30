let dollarsFormatter = new Intl.NumberFormat('en-US', {  style: 'currency', currency: 'USD'});

export default {
    methods: {
        formatCurrency: function(number) {
            return dollarsFormatter.format(number);
        }
    }
}
