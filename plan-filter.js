const searchFor = "สมาร์ทคอม"

const fs = require('fs')
const ryw = JSON.parse(fs.readFileSync('ryw.json', 'utf-8'))

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

for (const e of ryw) {
    if (e.title.search(searchFor) !== -1 || e.description.search(searchFor) !== -1) {
        const dateFormatter = new Intl.DateTimeFormat('th')
        const startDate = dateFormatter.format(new Date(e.start_date))
        const endDate = dateFormatter.format(new Date(e.end_date))

        let dFormat = startDate

        if (startDate != endDate) {
            dFormat = `${startDate} - ${endDate}`
        }
        
        console.log(`${dFormat} | ${e.title}`)
        console.log(`${replaceAll(
            replaceAll(
                replaceAll(e.description, "<p>", "")
                , "</p>", "")
                , "<br />", "\n"
            )}`)
        console.log('---\n')
    }
}