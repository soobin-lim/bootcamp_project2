document.addEventListener('DOMContentLoaded', async function () {

  var chipElems = document.querySelectorAll('.chips');
  var chipInstances = M.Chips.init(chipElems, {
    // data: [
    //   { tag: "Headliner" },
    //   { tag: "Carpet" }
    // ],
    placeholder: "Headliner, Carpet, RR Package Tray, Luggage Cover",
    onChipAdd: chipAdd,
    onChipDelete: chipDelete
  });

  async function chipAdd(e) {
    let chips = document.querySelectorAll('.chip');
    let lastChipNum = document.querySelectorAll('.chip').length - 1
    let lastChip = chips[lastChipNum]
    // let lastChipText = lastChip.innerHTML
    let lastChipText = lastChip.innerText.replace('close', '')
    lastChipText = lastChipText.slice(0, lastChipText.length - 1)
    const response = await fetch('/api/materialmaster/group', {
      method: 'POST',
      body: JSON.stringify({
        name: lastChipText
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
      alert('Successfully created a group')
      // document.location.replace('/');
    } else {
      alert('Failed to create a group');
    }
  }

  function chipDelete(e) {
    console.log(e)
  }
})