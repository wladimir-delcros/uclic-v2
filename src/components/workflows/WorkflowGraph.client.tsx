"use client";

import { useMemo, createElement } from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  NodeProps,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import "./WorkflowGraph.controls.css";

type N8nNode = {
  id?: string;
  name: string;
  type?: string;
  position?: [number, number];
};

type N8nConnectionTarget = {
  node: string;
  type: string;
  index: number;
};

type N8nConnections = {
  main?: N8nConnectionTarget[][];
  [key: string]: any;
};

type N8nWorkflow = {
  nodes?: N8nNode[];
  connections?: Record<string, N8nConnections>;
};

/** Nœud avec nom + description visible dans le diagramme (table workflow_nodes) */
function NodeWithDescription({ data }: NodeProps<{ label: string; description?: string }>) {
  return (
    <div className="rounded border bg-white dark:bg-gray-900 shadow-sm min-w-[140px] max-w-[220px]">
      <Handle type="target" position={Position.Left} className="!w-2 !h-2" />
      <div className="px-3 py-2">
        <div className="text-sm font-medium text-black dark:text-white leading-tight">
          {data.label}
        </div>
        {data.description && (
          <p className="mt-1 text-[10px] leading-snug text-black/70 dark:text-white/70">
            {data.description}
          </p>
        )}
      </div>
      <Handle type="source" position={Position.Right} className="!w-2 !h-2" />
    </div>
  );
}

const nodeTypes = { default: NodeWithDescription };

interface WorkflowGraphProps {
  n8nJson: unknown;
  /** Descriptions par node_name ou node_id (clé = name ou id n8n). Affichées au survol du nœud. */
  nodeDescriptions?: Record<string, string>;
}

export default function WorkflowGraph({ n8nJson, nodeDescriptions = {} }: WorkflowGraphProps) {
  const { nodes, edges } = useMemo(() => {
    const wf = (n8nJson || {}) as N8nWorkflow;
    const wfNodes = wf.nodes || [];

    const nodes: Node[] = wfNodes.map((n, idx) => {
      const id = n.name || n.id || String(idx);
      const [x, y] = n.position ?? [idx * 250, 0];
      const description =
        nodeDescriptions[n.name ?? ""] ?? nodeDescriptions[n.id ?? ""] ?? undefined;
      return {
        id,
        data: {
          label: n.name || n.type || id,
          ...(description && { description }),
        },
        position: { x, y },
        type: "default",
      };
    });

    const edges: Edge[] = [];
    const connections = wf.connections || {};

    Object.entries(connections).forEach(([fromName, conn]) => {
      const main = conn.main || [];
      main.forEach((group) => {
        group.forEach((c) => {
          const source = fromName;
          const target = c.node;
          if (!source || !target) {return;}
          const id = `${source}-${target}-${edges.length}`;
          edges.push({
            id,
            source,
            target,
            animated: true,
          });
        });
      });
    });

    return { nodes, edges };
  }, [n8nJson, nodeDescriptions]);

  if (!nodes.length) {
    return null;
  }

  // createElement avec uniquement les props voulues pour éviter que des props dépréciées (nodesSelectable) soient forwardées au div par React Flow
  return (
    <div className="workflow-graph-wrap relative w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/70 overflow-hidden">
      <div className="h-[360px] md:h-[420px] w-full">
        {createElement(
          ReactFlow,
          {
            nodes,
            edges,
            nodeTypes,
            fitView: true,
            elementsSelectable: false,
          },
          createElement(Background, { gap: 16, size: 1 }),
          createElement(Controls)
        )}
      </div>
      <div className="flex items-center justify-end gap-2 px-3 py-2 border-t border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03]">
        <a
          href="/audit"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:underline transition-colors"
        >
          Besoin d&apos;aide ?
        </a>
      </div>
    </div>
  );
}

