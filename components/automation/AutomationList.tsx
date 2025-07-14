import React, { useState } from 'react';
import { useAutomation } from './AutomationContext';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { Plus, Trash, Edit2, ChevronRight } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function AutomationList() {
  const { state, dispatch } = useAutomation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleAdd = () => {
    const newId = uuidv4();
    dispatch({
      type: 'ADD_AUTOMATION',
      automation: {
        id: newId,
        name: '未命名自动化',
        enabled: true,
        trigger: null,
        conditions: [],
        actions: [],
      },
    });
    setEditingId(newId);
    setEditName('未命名自动化');
  };

  const handleEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditName(name);
  };

  const handleEditSave = (id: string) => {
    dispatch({ type: 'UPDATE_AUTOMATION', id, automation: { name: editName } });
    setEditingId(null);
    setEditName('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除该自动化吗？')) {
      dispatch({ type: 'DELETE_AUTOMATION', id });
    }
  };

  const handleToggle = (id: string, enabled: boolean) => {
    dispatch({ type: 'TOGGLE_AUTOMATION', id, enabled });
  };

  const handleSelect = (id: string) => {
    dispatch({ type: 'SET_ACTIVE', id });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">自动化列表</h2>
        <Button onClick={handleAdd} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" /> 新建自动化
        </Button>
      </div>
      <div className="space-y-3">
        {state.automations.length === 0 && (
          <div className="text-gray-400 text-center py-8">暂无自动化，点击右上角新建</div>
        )}
        {state.automations.map(auto => (
          <div key={auto.id} className="flex items-center bg-white rounded-lg border shadow-sm px-4 py-3 gap-3 hover:shadow-md transition">
            <Switch checked={auto.enabled} onCheckedChange={checked => handleToggle(auto.id, checked)} />
            {editingId === auto.id ? (
              <input
                className="border rounded px-2 py-1 text-base w-40"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                onBlur={() => handleEditSave(auto.id)}
                onKeyDown={e => { if (e.key === 'Enter') handleEditSave(auto.id); }}
                autoFocus
              />
            ) : (
              <span className="font-medium text-base w-40 truncate" onDoubleClick={() => handleEdit(auto.id, auto.name)}>{auto.name}</span>
            )}
            <Button variant="ghost" size="icon" onClick={() => handleEdit(auto.id, auto.name)}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(auto.id)}>
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
            <Button variant="outline" size="icon" className="ml-auto" onClick={() => handleSelect(auto.id)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
} 