import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

function Dashboard() {
    const [products, setProducts] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const toggleSort = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [columns, setColumns] = useState(["title", "price"]);
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };
    const handleDrag = (e: any, column: string) => {
        e.dataTransfer.setData("column", column);
    };

    const handleDrop = (e: any, targetColumn: string) => {
        const draggedColumn = e.dataTransfer.getData("column");

        const newColumns = [...columns];
        const fromIndex = newColumns.indexOf(draggedColumn);
        const toIndex = newColumns.indexOf(targetColumn);

        // swap
        [newColumns[fromIndex], newColumns[toIndex]] =
            [newColumns[toIndex], newColumns[fromIndex]];

        setColumns(newColumns);
    };

    return (
        <div style={{
            padding: "20px", maxWidth: "100%", overflowX: "auto",
            backgroundImage: "url('https://www.bing.com/images/search?view=detailV2&ccid=%2bFi5PuXr&id=6213B1326FD272D6A9A04C797CA7D2EAA3DE47EE&thid=OIF.FTNdAMyxJsiJv9iMaDML8A&mediaurl=https%3a%2f%2fimg.freepik.com%2fpremium-photo%2fvibrant-watercolor-tiles-seamless-background-with-fruits-vegetables-world-food-day-slow-zoo_980716-481722.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.f858b93ee5eb330cd8e9ec8e4170a746%3frik%3d%26pid%3dImgRaw%26r%3d0&exph=417&expw=626&q=vegetable+fruits+image+background&FORM=IRPRST&ck=15335D00CCB126C889BFD88C68330BF0&selectedIndex=0&itb=0&ajaxhist=0&ajaxserp=0')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}>
            <h1 style={{ color: "burlywood" }}>Our Product Table </h1>

            <input
                style={{
                    width: "34%", marginTop: "3%", borderColor: "antiquewhite"
                    , backgroundColor: "ghostwhite", marginLeft: "17%", padding: "11px",
                    marginBottom: "-21px"
                }}
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{
                maxHeight: "400px",
                overflowY: "auto",
                marginTop: "3%"
            }}>

                <table border={1} cellPadding={10} style={{
                    width: "65%",
                    background: "blanchedalmond",
                    borderRadius: "11px",
                    marginTop: "3%",
                    marginLeft: "16%"
                }}>
                    <thead>
                        <tr style={{ cursor: "pointer" }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "#f9f9f9"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "white"}>
                            {columns.map((col) => (
                                <th
                                    key={col}
                                    draggable
                                    onDragStart={(e) => handleDrag(e, col)}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => handleDrop(e, col)}
                                    onClick={col === "price" ? toggleSort : undefined}
                                    style={{
                                        cursor: col === "price" ? "pointer" : "grab",
                                        background: "#eee",
                                        padding: "10px",
                                        position: "sticky",
                                        top: "0",

                                        zIndex: 1,

                                    }}
                                >
                                    {col === "title" && "Title"}
                                    {col === "price" && "Price 🔽"}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {products
                            .filter((product) =>
                                product.title.toLowerCase().includes(search.toLowerCase())
                            )
                            .sort((a, b) =>
                                sortOrder === "asc" ? a.price - b.price : b.price - a.price
                            )
                            .map((product) => (
                                <tr
                                    key={product.id}
                                    onClick={() => setSelectedProduct(product)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {columns.map((col) => (
                                        <td key={col}>
                                            {col === "title" ? product.title : product.price + "$"}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {selectedProduct && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{
                        background: "white",
                        padding: "20px",
                        borderRadius: "10px",
                        width: "300px"
                    }}>
                        <h2>{selectedProduct.title}</h2>
                        <p>Price: {selectedProduct.price}$</p>
                        <p>{selectedProduct.description}</p>

                        <button onClick={() => setSelectedProduct(null)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;