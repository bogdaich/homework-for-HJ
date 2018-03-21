'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const listBlock = document.querySelector('.list-block');

  function outputSet() {
    listBlock.classList.remove('complete');
    const checkBoxList = document.querySelectorAll('.list-block input');
    const output = listBlock.querySelector('output');
    let checkCount = 0;
    for (let checkBox of checkBoxList) {
      if (checkBox.checked === true)
        checkCount++;
    }
    output.innerHTML = `${checkCount} из ${checkBoxList.length}`;
    if (checkCount === checkBoxList.length)
      listBlock.classList.add('complete');
  }

  outputSet();
  listBlock.addEventListener('change', function (e) {
    if (e.target.nodeName !== 'INPUT')
      return;
    outputSet();
  });
});
