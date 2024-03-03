"use client";

import { ReactNode, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export const DropDown = () => {
  return (
    <div
      className="flex h-96 w-full justify-start bg-neutral-950 p-8
        text-neutral-200 md:justify-center
    "
    >
      <Tabs />
    </div>
  );
};

const Tabs = () => {
  const [selected, setSelected] = useState<number | null>(1);
  const [dir, setDir] = useState<null | "l" | "r">(null);

  const handleSetSelected = (val: number | null) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }
  };

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      className="relative flex h-fit gap-2"
    >
      {/* Render all of our tabs */}
      {TABS.map((t) => {
        return (
          <Tab
            key={t.id}
            selected={selected}
            handleSetSelected={handleSetSelected}
            tab={t.id}
          >
            {t.title}
          </Tab>
        );
      })}
      {/* Render our content */}
    </div>
  );
};

const Tab = ({
  children,
  tab,
  handleSetSelected,
  selected,
}: {
  children: ReactNode;
  tab: number;
  handleSetSelected: (val: number | null) => void;
  selected: number | null;
}) => {
  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors ${
        selected === tab
          ? " bg-neutral-800 text-neutral-100"
          : "text-neutral-400"
      }
      `}
    >
      <span>{children}</span>
      <FiChevronDown
        className={`transition-transform ${
          selected === tab ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};

const ExampleComponent = () => {
  return <div>Hello world</div>;
};

const TABS = [
  {
    title: "Products",
    Component: ExampleComponent,
  },
  {
    title: "Pricing",
    Component: ExampleComponent,
  },
  {
    title: "Blog",
    Component: ExampleComponent,
  },
].map((n, idx) => ({ ...n, id: idx + 1 }));
