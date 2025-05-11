import React from "react";

type SidebarProps = {
  structure: string[];
  onSelect: (file: string) => void;
};

function buildTree(paths: string[]) {
  const root: any = {};

  paths.forEach((path) => {
    const parts = path.split("/");
    let current = root;

    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = index === parts.length - 1 ? null : {};
      }
      current = current[part];
    });
  });

  return root;
}

function TreeNode({
  node,
  path = "",
  onSelect,
}: {
  node: any;
  path?: string;
  onSelect: (path: string) => void;
}) {
  return (
    <ul className="ml-4 space-y-6">
      {Object.entries(node).map(([name, child]) => {
        const currentPath = path ? `${path}/${name}` : name;
        const isFile = child === null;

        return (
          <li key={currentPath}>
            {isFile ? (
              <button
                onClick={() => onSelect(currentPath)}
                className="text-blue-400 hover:underline text-left cursor-pointer w-full flex items-center space-x-2"
              >
                <img
                  src="/images/python-ico.png"
                  alt="Python file"
                  className="w-5"
                />
                <span>{name}</span>
              </button>
            ) : (
              <>
                <div className="flex items-center space-x-2 text-white font-semibold mb-4">
                  <img
                    src="/images/folder-ico.png"
                    alt="Folder icon"
                    className="w-5"
                  />
                  <span>{name}</span>
                </div>
                <TreeNode node={child} path={currentPath} onSelect={onSelect} />
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function Sidebar({ structure, onSelect }: SidebarProps) {
  const tree = buildTree(structure);

  return (
    <div className="w-64 bg-gray-800 p-4 overflow-auto border-r border-gray-700 text-sm text-white">
      <TreeNode node={tree} onSelect={onSelect} />
    </div>
  );
}
