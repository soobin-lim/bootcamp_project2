document.addEventListener('DOMContentLoaded', function () {
  var elemsCollapsible = document.querySelectorAll('.collapsible');
  var instancesCollapsible = M.Collapsible.init(elemsCollapsible, {
    accordion: true,
    onOpenStart: () => { },
    onOpenEnd: () => { },
    onCloseStart: () => { },
    onCloseEnd: () => { },
    inDuration: 200,
    outDuration: 200,
  });

  enableInventoryInput(1);

  function enableInventoryInput(num) {

    var input_inventory1 = document.querySelectorAll('#inventory1')
    var input_inventory2 = document.querySelectorAll('#inventory2')
    var input_inventory3 = document.querySelectorAll('#inventory3')

    if (num != 1) input_inventory1.forEach(input => input.setAttribute("disabled", ""))
    if (num != 2) input_inventory2.forEach(input => input.setAttribute("disabled", ""))
    if (num != 3) input_inventory3.forEach(input => input.setAttribute("disabled", ""))

  }

});