angular.module('myApp').controller('MainController', function($scope) {
    $scope.items = [
        {name: 'Team 1', description: 'PLM'},
        {name: 'Team 2', description: 'Pricing'},
        {name: 'Team 3', description: 'Presentation'},
    ];

    $scope.newItem = {name: '', description: ''};

    $scope.addItem = function() {
        if (!$scope.newItem.name || !$scope.newItem.description) {
            return;
        }
        $scope.items.push({name: $scope.newItem.name, description: $scope.newItem.description});
        $scope.newItem = {name: '', description: ''}; // Reset the input after adding
    };
    $scope.editItem = function(item) {
        $scope.newItem = angular.copy(item);
        $scope.editing = true;
        $scope.originalItem = item;
    };
    
    $scope.deleteItem = function(item) {
        const index = $scope.items.indexOf(item);
        if (index > -1) {
            $scope.items.splice(index, 1);
        }
    };
    
    $scope.updateItem = function() {
        const index = $scope.items.indexOf($scope.originalItem);
        if (index !== -1) {
            $scope.items[index] = angular.copy($scope.newItem);
            $scope.resetForm();
        }
    };
    
    $scope.resetForm = function() {
        $scope.newItem = {name: '', description: ''};
        $scope.editing = false;
    };
    
});