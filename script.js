const departments = [
    {
        name: "Administration",
        employees: [
            { firstName: "Zoë", lastName: "Robins" },
            { firstName: "Madeleine", lastName: "Madden" }
        ]
    },
    {
        name: "Audit",
        employees: [
            { firstName: "Josha", lastName: "Sadowski" },
            { firstName: "Kate", lastName: "Fleetwood" }
        ]
    },
    {
        name: "Banking Operations",
        employees: [
            { firstName: "Priyanka", lastName: "Bose" },
            { firstName: "Hammed", lastName: "Animashaun" },
            { firstName: "Álvaro", lastName: "Morte" },
            { firstName: "Taylor", lastName: "Napier" },
            { firstName: "Alan", lastName: "Simmonds" }
        ]
    },
    {
        name: "Communications",
        employees: [
            { firstName: "Gil", lastName: "Cardinal" },
            { firstName: "Richard", lastName: "J. Lewis" }
        ]
    },
    {
        name: "Corporate Services",
        employees: [
            { firstName: "Randy", lastName: "Bradshaw" },
            { firstName: "Tracey", lastName: "Cook" },
            { firstName: "Lubomir", lastName: "Mykytiuk" }
        ]
    },
    {
        name: "Facilities",
        employees: [
            { firstName: "Dakota", lastName: "House" },
            { firstName: "Lori", lastName: "Lea Okemah" },
            { firstName: "Renae", lastName: "Morrisseau" },
            { firstName: "Rick", lastName: "Belcourt" }
        ]
    },
    {
        name: "Financial Services",
        employees: [
            { firstName: "Selina", lastName: "Hanusa" },
            { firstName: "Buffy", lastName: "Gaudry" },
            { firstName: "Shaneen", lastName: "Ann Fox" },
            { firstName: "Allan", lastName: "Little" },
            { firstName: "Danny", lastName: "Rabbit" }
        ]
    },
    {
        name: "Human Resources",
        employees: [
            { firstName: "Jesse", lastName: "Ed Azure" },
            { firstName: "Stacy", lastName: "Da Silva" },
            { firstName: "Vladimír", lastName: "Valenta" },
            { firstName: "Samone", lastName: "Sayeses-Whitney" },
            { firstName: "Paul", lastName: "Coeur" }
        ]
    },
    {
        name: "Information Technology",
        employees: [
            { firstName: "Graham", lastName: "Greene" },
            { firstName: "Sandika", lastName: "Evergreen" },
            { firstName: "Jennifer", lastName: "Rodriguez" }
        ]
    },
    {
        name: "IT Technician",
        employees: [
            { firstName: "Aiyana", lastName: "Littlebear" },
            { firstName: "Inara", lastName: "Thunderbird" },
            { firstName: "Kaya", lastName: "Runningbrook" },
            { firstName: "Elara", lastName: "Firehawk" },
            { firstName: "Siona", lastName: "Moonflower" },
            { firstName: "Kaiyu", lastName: "Greywolf" },
            { firstName: "Ayawamat", lastName: "Nightwind" },
            { firstName: "Tala", lastName: "Braveheart" },
            { firstName: "Iniko", lastName: "Stonebear" },
            { firstName: "Onatah", lastName: "Redhawk" }
        ]
    }
];

document.addEventListener("DOMContentLoaded", function () {

    const main = document.getElementById("employee-directory");

    departments.forEach(function (department) {

        const section = document.createElement("section");
        const heading = document.createElement("h2");
        const list = document.createElement("ul");

        heading.textContent = department.name;

        department.employees.forEach(function (employee) {

            const item = document.createElement("li");

            if (employee.lastName) {
                item.textContent = employee.firstName + " " + employee.lastName;
            } else {
                item.textContent = employee.firstName;
            }

            list.appendChild(item);
        });

        section.appendChild(heading);
        section.appendChild(list);

        main.appendChild(section);
    });

    const currentYear = new Date().getFullYear();
    document.getElementById("current-year").textContent = currentYear;

});