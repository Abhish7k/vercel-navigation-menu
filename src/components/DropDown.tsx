"use client";

import { ReactNode, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { AnimatePresence, easeIn, motion } from "framer-motion";

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
  const [selected, setSelected] = useState<number | null>(null);
  const [dir, setDir] = useState<null | "l" | "r">(null);

  const handleSetSelected = (val: number | null) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }

    setSelected(val);
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

      <AnimatePresence>
        {selected && <Content dir={dir} selected={selected} />}
      </AnimatePresence>
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

const Content = ({
  selected,
  dir,
}: {
  selected: number | null;
  dir: null | "l" | "r";
}) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 10,
      }}
      className="absolute left-0 top-[calc(100%_+_24px)] w-96 rounded-lg border border-neutral-600 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800 p-4"
    >
      <Bridge />
    </motion.div>
  );
};

const Bridge = () => {
  return <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />;
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
