document.addEventListener('DOMContentLoaded', async function () {
  var chipDatas;
  chipDatas = await getAllChips()
  chipDatas.map(chipData => {
    Object.assign(chipData, { 'tag': chipData['name'] })
    delete chipData['name']
    return chipData
  })
  console.log(chipDatas)
  var chipElems = document.querySelectorAll('.chips');
  var chipInstances = M.Chips.init(chipElems, {
    // data: [
    //   { tag: "Headliner" },
    //   { tag: "Carpet" }
    // ],
    data: chipDatas,
    placeholder: "HEADLINER, CARPET, RR Package Tray, Luggage Cover",
    onChipAdd: chipAdd,
    onChipDelete: chipDelete
  });

  async function getAllChips() {
    let allchips;
    await fetch('/api/materialmaster/group', {
      method: 'GET'
    }).then(response => response.text())
      .then(text => {
        try {
          allchips = JSON.parse(text)
        } catch (err) {
          console.log(err)
        }
      })
    return allchips
  }

  async function chipAdd(e, chip) {
    let textOfChip = chip.innerText.replace('close', '')
    textOfChip = textOfChip.slice(0, textOfChip.length - 1)
    console.log(textOfChip)
    const response = await fetch('/api/materialmaster/group', {
      method: 'POST',
      body: JSON.stringify({
        name: textOfChip
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

  async function chipDelete(e, chip) {
    let textOfChip = chip.innerText.replace('close', '')
    // textOfChip = textOfChip.slice(0, textOfChip.length - 1)
    console.log(textOfChip)
    const response = await fetch('/api/materialmaster/group/' + textOfChip, {
      method: 'DELETE'
    })
    console.log(response)
    if (response.ok) {
      alert('Successfully deleted a group')
      // document.location.replace('/');
    } else {
      alert('Failed to delete a group');
    }
  }
})