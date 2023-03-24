import ENVIROMENT from '../env.js';

const URL = `${ENVIROMENT.API_URL}/categories`;

let getNavList = async () => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       var response = await fetch(`${URL}`, options)
       var json = await response.json();
       return json;

   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let MountMenu = (items) => {   
    let menu = '';
    let size = Object.keys(items).length;

    if (size > 0) {
        for (let i =0; i < size; i++) {
            menu += `<li><a href="category.html?categoria=${items[i]}">${items[i]}</a></li>`
            
        }
    }
    return menu;
}

let Menu = {
    render: async () => { 
        let items = await getNavList();
        let categories = MountMenu(items);

        return categories;
    }    
}


export default Menu;