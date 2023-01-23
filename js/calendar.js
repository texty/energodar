//here we've used some tips from https://bl.ocks.org/mbostock/4063318

var width = 120,
    height = 120,
    cellSize = 16,
    innerCellSize = 12;

const dayFormatter_function = function(d) { return (d.getDay() + 6) % 7; }; 
const month_list = d3.range(1,12,1);


const localeMonth = {
    1:"Лютий",
    2:"Березень",
    3:"Квітень",
    4:"Травень",
    5:"Червень",
    6:"Липень",
    7:"Серпень",
    8:"Вересень",
    9:"Жовтень",
    10:"Листопад",
    11:"Грудень"
}

const template = document.getElementById('tip');
// template.style.display = 'block';

const color = d3.scaleOrdinal()
    .domain(["Спротив енергодарців", "Обстріли Енергодара",  'Місія МАГАТЕ', "Окупація та зміна інформаційного простору"])
    .range(["#346294", "red", "#74997F", "#AD1A2A"])
    .unknown("white");

const radius = d3.scaleOrdinal()
    .domain(["Спротив енергодарців", "Обстріли Енергодара",  'Місія МАГАТЕ', "Окупація та зміна інформаційного простору"])
    .range(["3", "3", "6", "6"]);



d3.csv("data/calendar_data_cleaned.csv", function(csv){

    var types_list = d3.map(csv, function(d){ return d.type}).keys();

    
    csv.forEach(function(d){ d.date = new Date(d.date) })

    //За цими категоріями фільтруємо квадрати
    // дати захоплення
    var stroked = csv.filter(function(d){ return d.type === "Захоплення міста"}).map(function(d){ return d.date});
    // дати захоплення
    var peachy = csv.filter(function(d){ return d.type === "Шантаж і загроза ЗАЕС"}).map(function(d){ return d.date});
 
    //дані розбиті по місяцях, по ним далі додаємо кола
    var nested_by_month = d3.nest()
        .key(function(d){return d.month;})
        .key(function(d){return d.type;})
        .entries(csv);


month_list.forEach(function(month){

    var svg = d3.select("main")
        .append("svg")
        .style("overflow", "visible")
        .attr("width",  "100%")
        .attr("height",  "100%")
        .attr("viewBox",  `0 0 120 120`)
        .append("g")
        .attr("transform", "translate(" + 0 + "," + 10 + ")");

    svg.append('text')
        .attr("x", 0)
        .attr("y", 10)
        .text(localeMonth[month])
        .attr("fill", "grey")
        .style("text-transform", "uppercase")

    //базові квадратики самого календаря
    var rect = svg
        .selectAll("rect")
        .data(function(d) { 
            return d3.timeDays(new Date(2022, month, 1), new Date(2022, month+1, 1)); })
        .enter().append("rect")
            .attr("class", 'calendar')
            .attr("width", innerCellSize)
            .attr("height", innerCellSize)
            // .attr("class", "day-rect")
            .attr("y", function(d) { return  getWeekNo(d) * cellSize })
            .attr("x", function(d) { return dayFormatter_function(d) * cellSize; })
            .attr("fill", "#333")
            .attr("data-tippy-content", function(d){
                let selected_day = csv.filter(function(k){
                    return k.date.toDateString() === d.toDateString()
                });

                var tip_html = `<p class='tip-date'>${d.toLocaleDateString('uk-UK', { year: 'numeric', month: 'long', day: 'numeric' })}</p><p>`

                selected_day.forEach(function(item){
                    tip_html = tip_html + 
                        `<span class="tip-subtitle">${item.description}</span> `
                        // `<span class='type-indicator' style="background-color: ${color(item.type)};"></span></h2>`
                        // `<p class='tip-p'>${item.full_description}</p>`
                })

                tip_html = tip_html + "</p>"

                if(selected_day.length > 0){
                    return tip_html
                } else {
                    return `<p class='tip-date'>${d.toLocaleDateString('uk-UK', { year: 'numeric', month: 'long', day: 'numeric' })}</p><p class='tip-p'>Про цей день нічого не відомо</p>`
                }
               
            });
            
            tippy('.calendar', {
                allowHTML: true,
                //trigger: "click",
                maxWidth: 250,

            });
    
    //фільтруємо дані за вказаним місяцем і додаємо маркери на календар
    let filtered = nested_by_month.filter(function(d){
        return d.key.toString() === (month+1).toString()
        });

    var small_circles_data = filtered[0].values
        .filter(function(d){ return ["Спротив енергодарців", "Обстріли Енергодара"].includes(d.key) })

    var big_circle_data = filtered[0].values
        .filter(function(d){ return ['Місія МАГАТЕ', "Окупація та зміна інформаційного простору"].includes(d.key) });
    


    big_circle_data.forEach(function(type,i){

        let theColor = color(type.key);
        let theRadius = radius(type.key);

        type.values.forEach(function(d){

            svg.append("circle")
            .attr("class", "t_"+i)
            .attr("r", theRadius)
            .attr("cy", function() { 
                return (getWeekNo(d.date) * cellSize) + innerCellSize/2 })
            .attr("cx", function() {
                return  dayFormatter_function(d.date) * cellSize + innerCellSize/2  })
            .attr("fill", theColor)
            .style("pointer-events", "none");

        })
        })


    small_circles_data.forEach(function(type,i){

        let theColor = color(type.key);
        let theRadius = radius(type.key);

        type.values.forEach(function(d){

            svg.append("circle")
            .attr("class", "t_"+i)
            .attr("r", theRadius)
            .attr("cy", function() { 
                return (getWeekNo(d.date) * cellSize) + innerCellSize/2 })
            .attr("cx", function() {
                return  dayFormatter_function(d.date) * cellSize + innerCellSize/2  })
            .attr("fill", theColor)
            .style("pointer-events", "none");

        })
    })


    rect.filter(function(d){
        let date1 = new Date(Date.UTC(d.getFullYear(),d.getMonth(), d.getDate()))    
            return (stroked.find(date => date.getTime() === date1.getTime())) != undefined;
        })
        .attr("stroke", "brown")
       


    rect.filter(function(d){
        let date1 = new Date(Date.UTC(d.getFullYear(),d.getMonth(), d.getDate()))    
            return (peachy.find(date => date.getTime() === date1.getTime())) != undefined;
        })
        .attr("fill", "#EA7C65")
    })


function getWeekNo(date) {
    var day = date.getDate()
    day += (date.getDay() == 0 ? 0 : 7 - date.getDay());
    return Math.ceil(parseFloat(day) / 7);
}

});
