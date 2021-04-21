function htmlParser(report){
  const HEAD = `
    <html>
      <head>
        <style>
          table, th, td {
            border: 1px solid black;
            paddig: 0;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <table>
          <tbody>
  `;
  const FOOTER = `
          </tbody>
        </table>
      </body>
    </html>
  `;

  let BODY = "";
  Object.keys(report).forEach(dateKey => {
    const dateObj = report[dateKey];
    let dateRowSpan = 1;
    let projectRow = ''
    Object.keys(dateObj).forEach(projectKey => {
      const project = dateObj[projectKey]
      let projectSpan = 1;
      dateRowSpan++
      let subjectRow = ''
      project.subjects.forEach(subject => {
        dateRowSpan++
        projectSpan++
        subjectRow += `<tr><td>${subject}</td></tr>`
      })
      projectRow += `<tr><td rowspan='${projectSpan}'>${projectKey}</td></tr>${subjectRow}`;
    })
    BODY += `<tr><td rowspan='${dateRowSpan}'>${dateKey}</td></tr>${projectRow}`;
  })


  return `${HEAD}${BODY}${FOOTER}`;
}

module.exports = htmlParser;
