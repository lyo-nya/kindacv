const items = document.querySelectorAll('.accordion-item');
// const hiddenNodes = document.querySelectorAll('.collapsed');
items.forEach(function(item) {
  item.addEventListener('show.bs.collapse', function() {
    items.forEach(function(item) {
      item.style['height'] = '6%';
    });
    item.style['height'] = '82%';
  });
  item.addEventListener('hidden.bs.collapse', function() {
    const hidden = document.getElementsByClassName('collapsed');
    if (hidden.length === 4) {
      items.forEach(function(item) {
        item.style['height'] = '25%';
      });
    }
    //   else {
    //   hiddenNodes.forEach(function(item) {
    //     item.style['height'] = '100%';
    //   });
    // }
  });
});

