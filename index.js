const axios = require('axios').default;
const fs = require('fs')

let page = 1
let totalEvents = []

async function discoverEvents() {
    const res = await axios.get(`https://rayongwit.ac.th/wp-json/tribe/events/v1/events?page=${page}`)
    const data = res.data

    for (const e of data.events) {
        totalEvents.push(e)
    }

    console.log(`Digging events... ${(page / data.total_pages) * 100}%`)

    page++

    if (page > data.total_pages) {
        console.log(`Digging complete! Saving to out.json...`)

        fs.writeFileSync('ryw.json', JSON.stringify(totalEvents))

        console.log(`Saved!`)
        console.log(`Total events: `, totalEvents.length)
        console.log(`Total events(API): `, data.total)

        return
    } else {
        discoverEvents()
    }
}

discoverEvents()