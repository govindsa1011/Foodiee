import { REFRESH_LIST } from '../actions/actionTypes';

const initialState = {
    listArray: [
        {
            key: 1,
            name: 'Pizza',
            image: 'https://d1doqjmisr497k.cloudfront.net/-/media/kamispl-2016/recipe/2000/pizza_po_sycylijsku_2000.jpg',
            isFav: true
        },
        {
            key: 2,
            name: 'Idli',
            image: 'https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/10/22/Pictures/_6d1f2f96-b6e5-11e7-ab59-1b1e25230a21.jpg',
            isFav: false
        },
        {
            key: 3,
            name: 'Dosa',
            image: 'https://miro.medium.com/max/940/0*NsaoQuhkfTvO-h40.',
            isFav: false
        },
        {
            key: 4,
            name: 'Panipuri',
            image: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Panipuri%2C_Golgappa%2C_Phuchka.jpg',
            isFav: true
        },
        {
            key: 5,
            name: 'Dabeli',
            image: 'https://i.ytimg.com/vi/BqBlp_Mw8Qs/maxresdefault.jpg',
            isFav: true
        },
        {
            key: 6,
            name: 'Vadapav',
            image: 'https://www.fortunefoods.com/sites/default/files/styles/large_image/public/17.png',
            isFav: false
        },
        {
            key: 7,
            name: 'Khaman Dhokla',
            image: 'https://www.rasoimenu.com/wp-content/uploads/2016/09/Besan-Dhokla-Recipe-by-Rasoi-Menu.jpg',
            isFav: false
        },
        {
            key: 8,
            name: 'Fafada Jalebi',
            image: 'https://assets.traveltriangle.com/blog/wp-content/uploads/2018/02/Fafda-Jalebi.jpg',
            isFav: true
        },
        {
            key: 9,
            name: 'Manchoorian',
            image: 'https://ministryofcurry.com/wp-content/uploads/2017/09/IMG_4098.jpg',
            isFav: false
        },
        {
            key: 10,
            name: 'Noodles',
            image: 'https://cdn3.tmbi.com/toh/GoogleImagesPostCard/exps108597_SD163324B08_06_4b.jpg',
            isFav: true
        },
        {
            key: 11,
            name: 'Chinese Bhel',
            image: 'https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Dhara_Shah_/Chinese_bhel__No_onion_No_garlic.jpg',
            isFav: true
        },
        {
            key: 12,
            name: 'Pav Bhaji',
            image: 'https://i2.wp.com/www.neehees.com/wp-content/uploads/2019/02/Pav-Bhaji-WEB.png?fit=1024%2C614&ssl=1',
            isFav: true
        },
        {
            key: 13,
            name: 'Burger',
            image: 'https://images5.alphacoders.com/433/433534.jpg',
            isFav: true
        },
        {
            key: 14,
            name: 'French Fries',
            image: 'https://ak9.picdn.net/shutterstock/videos/33342769/thumb/1.jpg',
            isFav: true
        },
        {
            key: 15,
            name: 'Gathiya',
            image: 'http://makemyonlineshop.s3.amazonaws.com/86732681469108082.jpg',
            isFav: false
        }
    ]
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case REFRESH_LIST:
            return {
                ...state,
                listArray: state.listArray
            };

        default: return state;
    }
}

export default reducer;