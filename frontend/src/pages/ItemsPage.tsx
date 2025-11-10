import { useEffect, useState } from "react";
import { api } from "../api/api";

interface Item {
    id: number,
    name: string,
}

export default function ItemsPage() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        api.get<Item[]>("/items")
            .then(setItems)
            .catch((err) => console.error("Failed to fetch users: ", err))
    }, []);

    return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
}