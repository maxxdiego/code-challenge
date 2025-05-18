import React from "react";

interface TreeNodeProps {
  node: TreeNodeType;
  path?: string;
  onSelect: (path: string) => void;
}

type SidebarProps = {
  structure: string[];
  onSelect: (file: string) => void;
};

type TreeNodeType = {
  [key: string]: TreeNodeType | null;
};

function buildTree(paths: string[]): TreeNodeType {
  const root: TreeNodeType = {};

  paths.forEach((path) => {
    const parts = path.split("/");
    let current = root;

    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = index === parts.length - 1 ? null : {};
      }
      current = current[part] as TreeNodeType;
    });
  });

  return root;
}

function TreeNode({ node, path = "", onSelect }: TreeNodeProps) {
  return (
    <ul className="ml-4 space-y-4 text-xs sm:text-sm">
      {Object.entries(node).map(([name, child]) => {
        const currentPath = path ? `${path}/${name}` : name;
        const isFile = child === null;

        return (
          <li key={currentPath}>
            {isFile ? (
              <button
                onClick={() => onSelect(currentPath)}
                className="text-gray-400 hover:underline text-left cursor-pointer w-full flex items-center space-x-2"
              >
                <img
                  src="/images/python-ico.png"
                  alt="Python file"
                  className="w-4"
                />
                <span>{name}</span>
              </button>
            ) : (
              <>
                <div className="flex items-center space-x-2 text-white font-medium mb-4">
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
    <div className="w-48 sm:w-64 bg-[#181928] p-2 sm:p-4 overflow-auto border-r border-[#181928] text-xs sm:text-sm text-white">
      <TreeNode node={tree} onSelect={onSelect} />
    </div>
  );
}
