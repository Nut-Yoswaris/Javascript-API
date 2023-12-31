// fetch('https://jsonplaceholder.typicode.com/users')
// .then(resp=>{
//     console.log(resp)
//     return resp.json()
// })
// .then( data => {
//     console.log(data)
//     console.log(typeof data)
//     console.log(data[0].name)
// })
    

const userList = document.querySelector('.user-list');
const userDetailsContainer = document.querySelector('.user-details');

function makeElement(tag, attr_n, attr_v, content) {
    let output = document.createElement(tag);
    (!!attr_n) && output.setAttribute(attr_n, attr_v);
    output.textContent = content;
    return output;
}

function showDetails(user) {
    const detailsList = makeElement('ul', '', '', '');
    for (const key in user) {
        if (user.hasOwnProperty(key)) {
            const li = makeElement('li', '', '', `${key}: ${user[key]}`);
            detailsList.append(li);
        }
    }
    userDetailsContainer.innerHTML = '';
    userDetailsContainer.append(detailsList);
}

fetch('https://jsonplaceholder.typicode.com/users')
    .then(resp => resp.json())
    .then(data => {
        for (let el of data) {
            const li = makeElement('li', 'data-id', el.id, el.name);
            li.addEventListener('click', async () => {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${el.id}`);
                const userDetails = await response.json();
                showDetails(userDetails);
            });

            userList.append(li);
        }
    });


// const userList = document.querySelector('.user-list')

//     fetch('https://jsonplaceholder.typicode.com/users')
//         .then(response => response.json())
//         .then(users => {
//             users.forEach(user => {
//                 const listItem = document.createElement('li');
//                 listItem.textContent = `${user.name} ${user.email}`;
//                 userList.appendChild(listItem);
//             });
//         })
//         .catch(error => console.error('Error fetching users:', error));