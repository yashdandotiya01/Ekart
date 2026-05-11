import "../styles/categories.css";

function Categories(){

    const data = [
        {
            name:"Fashion",
            image:"https://images.unsplash.com/photo-1445205170230-053b83016050",
            loading:"lazy"
        },

        {
            name:"Mobiles",
            image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
            loading:"lazy"
        },

        {
            name:"Shoes",
            image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            loading:"lazy"
        },

        {
            name:"Electronics",
            image:"https://images.unsplash.com/photo-1498049794561-7780e7231661",
            loading:"lazy"
        },
    ];

    return(
        <div className="categories">

            <h1 className="section-title">
                Shop By Category
            </h1>

            <div className="category-grid">

                {
                    data.map((item,index)=>(
                        <div
                            className="category-card"
                            key={index}
                        >

                            <img src={item.image} alt="" loading="lazy" />

                            <div className="overlay">
                                {item.name}
                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default Categories;