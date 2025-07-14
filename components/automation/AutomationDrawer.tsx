import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '../ui/drawer';
import { AutomationProvider, useAutomation } from './AutomationContext';
import { AutomationList } from './AutomationList';
import { AutomationOverview } from './AutomationOverview';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

export function AutomationDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AutomationProvider>
      <Drawer open={isOpen} onClose={onClose}>
        <DrawerContent className="w-screen h-[90vh] p-0 flex flex-col">
          <AutomationDrawerContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </AutomationProvider>
  );
}

function AutomationDrawerContent({ onClose }: { onClose: () => void }) {
  const { state, dispatch } = useAutomation();
  const active = state.automations.find(a => a.id === state.activeId);

  if (!active) {
    // 列表页
    return (
      <>
        <DrawerHeader className="border-b">
          <DrawerTitle>自动化管理</DrawerTitle>
        </DrawerHeader>
        <AutomationList />
      </>
    );
  }

  // 编辑页
  return (
    <div className="relative flex-1 flex flex-col h-full">
      <DrawerHeader className="flex items-center gap-2 border-b bg-white sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => dispatch({ type: 'SET_ACTIVE', id: null })}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <DrawerTitle asChild>
          <span className="font-semibold text-lg">编辑自动化</span>
        </DrawerTitle>
        <div className="flex-1" />
        <Button variant="ghost" size="icon" onClick={onClose}>✕</Button>
      </DrawerHeader>
      <div className="flex-1 h-0">
        <AutomationOverview automation={active} automationId={active.id} />
      </div>
    </div>
  );
} 