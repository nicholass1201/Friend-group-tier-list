import React, { useState, useRef } from "react";

import nickImage from "./assets/nick.PNG";
import austinImage from "./assets/austin.PNG";
import calebImage from "./assets/caleb.PNG";
import ethanImage from "./assets/ethaan.PNG";
import jamesImage from "./assets/james.PNG";
import javonImage from "./assets/javon.PNG";
import shreyashImage from "./assets/shreyash.PNG";

const generateId = () =>
  `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-trash-2"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-eye"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-eye-off"
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

const PlusCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-plus-circle"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="16" />
    <line x1="8" x2="16" y1="12" y2="12" />
  </svg>
);

const DraggableItem = ({ item, onDragStart }) => {
  return (
    <div
      id={item.id}
      draggable="true"
      onDragStart={onDragStart}
      className="flex flex-col items-center justify-center p-2 bg-gray-700 border border-gray-600 rounded-lg shadow-md cursor-grab active:cursor-grabbing transition-transform duration-200 ease-in-out transform hover:scale-105"
      style={{ touchAction: "none" }}
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-md mb-2 pointer-events-none"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/80x80/1F2937/E5E7EB?text=${item.name.charAt(
            0
          )}`;
        }}
      />
      <span className="text-white text-sm font-medium text-center break-all">
        {item.name}
      </span>
    </div>
  );
};

const TierRow = ({
  tier,
  onDrop,
  onDragOver,
  onTierNameChange,
  onRemoveTier,
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(tier.name);
  const inputRef = useRef(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBlur = () => {
    onTierNameChange(tier.id, name);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef.current.blur();
    }
  };

  const handleLabelClick = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div className="flex items-stretch min-h-[120px] mb-1">
      {}
      <div
        className="w-28 flex-shrink-0 flex items-center justify-center text-2xl font-bold text-white rounded-l-lg cursor-pointer"
        style={{ backgroundColor: tier.color }}
        onClick={handleLabelClick}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={handleNameChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full h-full bg-transparent text-center text-white font-bold text-2xl outline-none border-none"
          />
        ) : (
          <span>{tier.name}</span>
        )}
      </div>

      {}
      <div
        id={tier.id}
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="flex-grow bg-gray-800 p-3 flex flex-wrap items-start gap-3"
      >
        {children}
      </div>

      {}
      <button
        onClick={() => onRemoveTier(tier.id)}
        className="w-12 flex-shrink-0 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-r-lg transition-colors"
        aria-label={`Remove ${tier.name} tier`}
      >
        <TrashIcon />
      </button>
    </div>
  );
};

function App() {
  const [title, setTitle] = useState({
    text: "My Awesome Tier List",
    blurred: false,
  });
  const [tiers, setTiers] = useState([
    { id: "tier-s", name: "S", color: "#ff7f7f", items: [] },
    { id: "tier-a", name: "A", color: "#ffbf7f", items: [] },
    { id: "tier-b", name: "B", color: "#ffff7f", items: [] },
    { id: "tier-c", name: "C", color: "#7fff7f", items: [] },
    { id: "tier-d", name: "D", color: "#7fbfff", items: [] },
    { id: "tier-e", name: "E", color: "#7f7fff", items: [] },
    { id: "tier-f", name: "F", color: "#bf7fff", items: [] },
  ]);
  const [unrankedItems, setUnrankedItems] = useState([
    {
      id: generateId(),
      name: "Nick",
      imageUrl: nickImage,
    },
    {
      id: generateId(),
      name: "James",
      imageUrl: jamesImage,
    },
    {
      id: generateId(),
      name: "Ethan",
      imageUrl: ethanImage,
    },
    {
      id: generateId(),
      name: "Austin",
      imageUrl: austinImage,
    },
    {
      id: generateId(),
      name: "Caleb",
      imageUrl: calebImage,
    },
    {
      id: generateId(),
      name: "Shreyash",
      imageUrl: shreyashImage,
    },
    {
      id: generateId(),
      name: "Javon",
      imageUrl: javonImage,
    },
  ]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemImage, setNewItemImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    const droppedItem = findItem(itemId);
    if (!droppedItem) return;

    const targetId = e.currentTarget.id;

    removeItem(itemId);

    if (targetId === "unranked-pool") {
      setUnrankedItems((prev) => [...prev, droppedItem]);
    } else {
      setTiers((prevTiers) =>
        prevTiers.map((tier) =>
          tier.id === targetId
            ? { ...tier, items: [...tier.items, droppedItem] }
            : tier
        )
      );
    }
  };

  const findItem = (itemId) => {
    for (const tier of tiers) {
      const item = tier.items.find((i) => i.id === itemId);
      if (item) return item;
    }
    return unrankedItems.find((i) => i.id === itemId);
  };

  const removeItem = (itemId) => {
    setTiers((prevTiers) =>
      prevTiers.map((tier) => ({
        ...tier,
        items: tier.items.filter((i) => i.id !== itemId),
      }))
    );

    setUnrankedItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  };

  const handleTitleChange = (e) => {
    setTitle({ ...title, text: e.target.value });
  };

  const toggleTitleBlur = () => {
    setTitle({ ...title, blurred: !title.blurred });
  };

  const handleTierNameChange = (tierId, newName) => {
    setTiers(
      tiers.map((tier) =>
        tier.id === tierId ? { ...tier, name: newName } : tier
      )
    );
  };

  const handleRemoveTier = (tierId) => {
    const tierToRemove = tiers.find((t) => t.id === tierId);
    if (tierToRemove && tierToRemove.items.length > 0) {
      setUnrankedItems((prev) => [...prev, ...tierToRemove.items]);
    }
    setTiers(tiers.filter((tier) => tier.id !== tierId));
  };

  const handleNewItemImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewItemImage(URL.createObjectURL(file));
    }
  };

  const handleAddNewItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemImage) {
      alert("Please provide a name and an image for the new item.");
      return;
    }
    const newItem = {
      id: generateId(),
      name: newItemName.trim(),
      imageUrl: newItemImage,
    };
    setUnrankedItems([...unrankedItems, newItem]);

    setNewItemName("");
    setNewItemImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {}
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-4">
            <input
              type="text"
              value={title.text}
              onChange={handleTitleChange}
              className={`bg-transparent text-4xl md:text-5xl font-bold text-center outline-none p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${
                title.blurred ? "blur-lg" : "blur-none"
              }`}
              aria-label="Tier list title"
            />
            <button
              onClick={toggleTitleBlur}
              className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
              aria-label="Toggle title blur"
            >
              {title.blurred ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </div>
        </header>

        {}
        <main className="bg-gray-800/50 border border-gray-700 rounded-xl p-2 md:p-4 shadow-2xl">
          {tiers.map((tier) => (
            <TierRow
              key={tier.id}
              tier={tier}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onTierNameChange={handleTierNameChange}
              onRemoveTier={handleRemoveTier}
            >
              {tier.items.map((item) => (
                <DraggableItem
                  key={item.id}
                  item={item}
                  onDragStart={handleDragStart}
                />
              ))}
            </TierRow>
          ))}
        </main>

        {}
        <section className="mt-8">
          <div
            id="unranked-pool"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl p-4 min-h-[150px]"
          >
            <h3 className="text-xl font-bold text-gray-400 mb-4 text-center">
              Unranked Items
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {unrankedItems.map((item) => (
                <DraggableItem
                  key={item.id}
                  item={item}
                  onDragStart={handleDragStart}
                />
              ))}
              {unrankedItems.length === 0 && (
                <p className="text-gray-500">All items have been ranked!</p>
              )}
            </div>
          </div>

          <div className="mt-8 max-w-md mx-auto bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2">
              <PlusCircleIcon /> Add New Item
            </h3>
            <form onSubmit={handleAddNewItem} className="space-y-4">
              <div>
                <label
                  htmlFor="newItemName"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Item Name
                </label>
                <input
                  id="newItemName"
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g., 'New Person'"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="newItemImage"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Item Image
                </label>
                <input
                  id="newItemImage"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleNewItemImageChange}
                  accept="image/*"
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                  required
                />
              </div>
              {newItemImage && (
                <div className="flex justify-center">
                  <img
                    src={newItemImage}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg mt-2"
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Add to Pool
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
