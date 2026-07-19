import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, setSelected, children }) {
  return (
    <div className="w-full px-1 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex gap-1 bg-white border border-gray-200 rounded-lg p-1 w-fit">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) =>
                classNames(
                  "flex items-center outline-none gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  selected
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-500 hover:text-gray-700",
                )
              }
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="w-full mt-6">{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
}