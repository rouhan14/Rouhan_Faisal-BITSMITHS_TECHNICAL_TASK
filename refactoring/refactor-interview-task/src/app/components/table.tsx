"use client";

import { useState, useRef, useEffect } from "react";

// Define types with clear, descriptive names
export type IssueStatus = "open" | "resolved";

export type Issue = {
  id: string;
  name: string;
  message: string;
  status: IssueStatus;
  numEvents: number;
  numUsers: number;
  value: number;
};

type TableProps = {
  issues: Issue[];
};


// Making different components to make it modularized

const Table = ({ issues }: TableProps) => {
  // Use a single state to track selected issue IDs
  const [selectedIssueIds, setSelectedIssueIds] = useState<Set<string>>(new Set());
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);
  
  // Get all open issues (could be filtered when needed instead of stored)
  const openIssues = issues.filter(issue => issue.status === "open");
  const openIssueIds = openIssues.map(issue => issue.id);
  
  // Update the indeterminate state of the checkbox
  useEffect(() => {
    if (!selectAllCheckboxRef.current) return;
    
    const allOpenSelected = openIssueIds.every(id => selectedIssueIds.has(id));
    const someOpenSelected = openIssueIds.some(id => selectedIssueIds.has(id));
    
    selectAllCheckboxRef.current.indeterminate = someOpenSelected && !allOpenSelected;
  }, [selectedIssueIds, openIssueIds]);

  // Toggle selection for a single issue
  const toggleIssueSelection = (issueId: string) => {
    const newSelectedIssueIds = new Set(selectedIssueIds);
    
    if (newSelectedIssueIds.has(issueId)) {
      newSelectedIssueIds.delete(issueId);
    } else {
      newSelectedIssueIds.add(issueId);
    }
    
    setSelectedIssueIds(newSelectedIssueIds);
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    // Check if all open issues are currently selected
    const allOpenSelected = openIssueIds.every(id => selectedIssueIds.has(id));
    
    if (allOpenSelected) {
      // Deselect all if all are currently selected
      setSelectedIssueIds(new Set());
    } else {
      // Select all open issues
      const newSelectedIssueIds = new Set(selectedIssueIds);
      openIssueIds.forEach(id => newSelectedIssueIds.add(id));
      setSelectedIssueIds(newSelectedIssueIds);
    }
  };

  return (
    <table className="w-full border-collapse shadow-lg">
      <thead>
        <tr className="border-2 border-gray-200">
          <th className="py-6 pl-6 text-left w-[48px]">
            <input
              ref={selectAllCheckboxRef}
              className="w-5 h-5 cursor-pointer"
              type="checkbox"
              id="select-all-checkbox"
              checked={openIssueIds.length > 0 && openIssueIds.every(id => selectedIssueIds.has(id))}
              onChange={handleSelectAll}
            />
          </th>
          <th className="py-6 min-w-[8rem] text-left text-black">
            {selectedIssueIds.size > 0 ? `Selected ${selectedIssueIds.size}` : "None selected"}
          </th>
          <th colSpan={2} />
        </tr>
        <tr className="border-2 border-gray-200">
          <th className="py-6 pl-6" />
          <th className="py-6 text-left font-medium text-black">Name</th>
          <th className="py-6 text-left font-medium text-black">Message</th>
          <th className="py-6 text-left font-medium text-black">Status</th>
        </tr>
      </thead>

      <tbody>
        {issues.map((issue) => (
          <IssueRow
            key={issue.id}
            issue={issue}
            isSelected={selectedIssueIds.has(issue.id)}
            onToggle={issue.status === "open" ? () => toggleIssueSelection(issue.id) : undefined}
          />
        ))}
      </tbody>
    </table>
  );
};

// Extract row component for better organization
type IssueRowProps = {
  issue: Issue;
  isSelected: boolean;
  onToggle?: () => void;
};

const IssueRow = ({ issue, isSelected, onToggle }: IssueRowProps) => {
  const { name, message, status } = issue;
  const isOpen = status === "open";
  
  const rowClasses = `
    ${isOpen ? "cursor-pointer hover:bg-blue-50 text-black" : "text-gray-600 cursor-not-allowed"}
    border-b border-gray-200
    ${isSelected ? "bg-blue-50" : ""}
  `.trim();

  const handleRowClick = () => {
    if (onToggle) onToggle();
  };

  return (
    <tr className={rowClasses} onClick={handleRowClick}>
      <td className="py-6 pl-6">
        {isOpen ? (
          <input
            className="w-5 h-5 cursor-pointer"
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              if (onToggle) onToggle();
            }}
          />
        ) : (
          <input
            className="w-5 h-5 opacity-50"
            type="checkbox"
            disabled
          />
        )}
      </td>
      <td className="py-6">{name}</td>
      <td className="py-6">{message}</td>
      <td className="py-6">
        <StatusBadge status={status} />
      </td>
    </tr>
  );
};

// Extract Status Badge component for better reusability
type StatusBadgeProps = {
  status: IssueStatus;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const isOpen = status === "open";
  
  return (
    <div className="flex items-center gap-2">
      <span 
        className={`inline-block w-[15px] h-[15px] rounded-full ${
          isOpen ? "bg-blue-600" : "bg-gray-400"
        }`} 
      />
      <span 
        className={`font-medium ${
          isOpen ? "text-blue-700" : "text-gray-700"
        }`}
      >
        {isOpen ? "Open" : "Resolved"}
      </span>
    </div>
  );
};

export default Table;