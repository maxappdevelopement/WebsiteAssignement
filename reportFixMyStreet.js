fetch('https://www.fixmystreet.com/open311/v2/requests.json?jurisdiction_id=fixmystreet.com&agency_responsible=2514&start_date=2018-08-01&end_date=2018-08-31')
  .then(function (response) { return response.json() })
  .then(function (result) { console.log(result)

    let record = result.requests[0].request

    let reportsPerWeekday = [0, 0, 0, 0, 0, 0, 0]

    for (let i = 0; i < record.length; i++) {
      let date = new Date(record[i].agency_sent_datetime)
      let day = date.getDay()
      reportsPerWeekday[day]++
    }

    let reportsPerCategory = {}
    let category = []

   for (let i = 0; i < record.length; i++) {
      category = record[i].service_code
      reportsPerCategory[category]++
    if (isNaN(reportsPerCategory[category])) {
       reportsPerCategory[category] = 1
      }
     }

      let categoryArray = []
      let countArray = []

      Object.keys(reportsPerCategory).forEach(function(key) {
      categoryArray.push(key)
      countArray.push(reportsPerCategory[key])
    })

// create table 1
    let table = document.createElement('table')
    table.setAttribute('style', 'margin-bottom:1.5em')
    let th1 = document.createElement('th')
    th1.textContent=('Weekday')
    table.appendChild(th1)
    let th2 = document.createElement('th')
    th2.textContent=('Number of reports')
    table.appendChild(th2)

    let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    for (let i = 0; i < reportsPerWeekday.length; i++) {
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')

        let weekday = document.createTextNode(weekdays[i])
        let count = document.createTextNode(reportsPerWeekday[i])

        td1.appendChild(weekday)
        td2.appendChild(count)
        tr.appendChild(td1)
        tr.appendChild(td2)
        table.appendChild(tr)
    }
    document.body.appendChild(table)

  //create table 2
    let input = document.createElement('input')
    input.setAttribute("id", "myInput")
    input.setAttribute("type", "text")
    input.setAttribute("onkeyup", "searchFunction()")
    input.setAttribute("placeholder", "Search for categories...")
    document.body.appendChild(input)

    let secondTable = document.createElement('table')
    secondTable.setAttribute("id", "myTable")

      let th3 = document.createElement('th')
      th3.textContent=('Category')
      secondTable.appendChild(th3)
      let th4 = document.createElement('th')
      th4.textContent=('Number of reports')
      secondTable.appendChild(th4)

    for (let i = 0; i < categoryArray.length; i++) {
        let secondTr = document.createElement('tr')
        let secondTd1 = document.createElement('td')
        let secondTd2 = document.createElement('td')

        let category = document.createTextNode(categoryArray[i])
        let count = document.createTextNode(countArray[i])

        secondTd1.appendChild(category)
        secondTd2.appendChild(count)
        secondTr.appendChild(secondTd1)
        secondTr.appendChild(secondTd2)
        secondTable.appendChild(secondTr)
    }
    document.body.appendChild(secondTable)


// create mouseovereffect
    let allTd = document.getElementsByTagName('tr')

    let addColor = function () {
      this.style.backgroundColor = "#e6e6fa";
    }
    let removeColor = function () {
      this.style.backgroundColor = "white";
    }

    for (var i = 0; i < allTd.length; i++) {
      allTd[i].addEventListener('mouseover', addColor)
      allTd[i].addEventListener('mouseout', removeColor)
    }
})

// create searchfuntion
  function searchFunction() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput")
    filter = input.value.toUpperCase()
    table = document.getElementById("myTable")
    tr = table.getElementsByTagName("tr")
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0]
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = ""
        } else {
            tr[i].style.display = "none"
        }
    }
}
