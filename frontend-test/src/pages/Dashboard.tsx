import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

function Dashboard() {
    const [products, setProducts] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [columns, setColumns] = useState(["title", "price"]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const toggleSort = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const handleDrag = (e: any, column: string) => {
        e.dataTransfer.setData("column", column);
    };

    const handleDrop = (e: any, targetColumn: string) => {
        const draggedColumn = e.dataTransfer.getData("column");

        const newColumns = [...columns];
        const fromIndex = newColumns.indexOf(draggedColumn);
        const toIndex = newColumns.indexOf(targetColumn);

        [newColumns[fromIndex], newColumns[toIndex]] =
            [newColumns[toIndex], newColumns[fromIndex]];

        setColumns(newColumns);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "20px",
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1542838132-92c53300491e')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative"
            }}
        >
            {/* overlay */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.45)"
                }}
            />

            {/* content */}
            <div style={{ position: "relative", zIndex: 1 }}>
                <h1 style={{ color: "white", textAlign: "center" }}>
                    Our Products Dashboard 🥦🍓
                </h1>

                {/* search */}
                <input
                    style={{
                        width: "40%",
                        margin: "20px auto",
                        display: "block",
                        padding: "12px",
                        borderRadius: "12px",
                        border: "none",
                        outline: "none",
                        backdropFilter: "blur(10px)",
                        background: "rgba(255,255,255,0.2)",
                        color: "white"
                    }}
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* table */}
                <table
                    cellPadding={10}
                    style={{
                        width: "70%",
                        margin: "0 auto",
                        borderCollapse: "collapse",
                        backdropFilter: "blur(15px)",
                        background: "rgba(255,255,255,0.15)",
                        borderRadius: "15px",
                        overflow: "hidden",
                        color: "white"
                    }}
                >
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col}
                                    draggable
                                    onDragStart={(e) => handleDrag(e, col)}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => handleDrop(e, col)}
                                    onClick={col === "price" ? toggleSort : undefined}
                                    style={{
                                        position: "sticky",
                                        top: 0,
                                        background: "rgba(255,255,255,0.3)",
                                        padding: "12px",
                                        cursor: col === "price" ? "pointer" : "grab",
                                        color: "white"
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
                            .filter((p) =>
                                p.title.toLowerCase().includes(search.toLowerCase())
                            )
                            .sort((a, b) =>
                                sortOrder === "asc" ? a.price - b.price : b.price - a.price
                            )
                            .map((product) => (
                                <tr
                                    key={product.id}
                                    onClick={() => setSelectedProduct(product)}
                                    style={{
                                        cursor: "pointer",
                                        transition: "0.3s"
                                    }}
                                    onMouseEnter={(e) =>
                                    (e.currentTarget.style.background =
                                        "rgba(255,255,255,0.1)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.background = "transparent")
                                    }
                                >
                                    {columns.map((col) => (
                                        <td key={col}>
                                            {col === "title"
                                                ? product.title
                                                : product.price + "$"}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>

                {/* modal */}
                {selectedProduct && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: "rgba(0,0,0,0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <div
                            style={{
                                background: "rgba(255,255,255,0.15)",
                                backdropFilter: "blur(15px)",
                                padding: "20px",
                                borderRadius: "15px",
                                width: "300px",
                                color: "white"
                            }}
                        >
                            <h2>{selectedProduct.title}</h2>
                            <p>Price: {selectedProduct.price}$</p>
                            <p>{selectedProduct.description}</p>

                            <button
                                onClick={() => setSelectedProduct(null)}
                                style={{
                                    marginTop: "10px",
                                    padding: "10px",
                                    border: "none",
                                    borderRadius: "10px",
                                    cursor: "pointer"
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;