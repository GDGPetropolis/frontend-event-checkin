export default {
    methods: {
        getFieldsOfItems(list) {
            var options = [];
            var obj = list[0];

            for(var k in obj){
                var testValue = {
                    key: k,
                    sortable: true
                }

                options.push(testValue);
            }

            var action = { key: 'actions', label: 'Ações' };
            options.push(action);

            return options;
        },
        getFieldsOfItemsWithoutAction(list) {
            var options = [];
            var obj = list[0];

            for(var k in obj){
                var testValue = {
                    key: k,
                    sortable: true
                }

                options.push(testValue);
            }

            return options;
        }
    }
}