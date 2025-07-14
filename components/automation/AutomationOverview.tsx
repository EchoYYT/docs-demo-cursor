import React, { useState } from 'react';
import { useAutomation, AutomationItem } from './AutomationContext';
import { TriggerBlock } from './TriggerBlock';
import { ConditionBlock } from './ConditionBlock';
import { ActionBlock } from './ActionBlock';
import { TemplateBlock } from './TemplateBlock';
import { TriggerEditor } from './TriggerEditor';
import { ConditionEditor } from './ConditionEditor';
import { Button } from '../ui/button';
import { Plus, Zap, Search, Bot, Check, ChevronRight, Sparkles, Clock, Users, Target } from 'lucide-react';
import { Sheet, SheetContent } from '../ui/sheet';
import { ActionEditor } from './ActionEditor';

interface AutomationOverviewProps {
  automation: AutomationItem | undefined;
  automationId: string;
}

export function AutomationOverview({ automation, automationId }: AutomationOverviewProps) {
  if (!automation) {
    return <div className="text-center text-gray-400 py-8">未找到自动化配置</div>;
  }
  const { dispatch } = useAutomation();
  const [showTrigger, setShowTrigger] = useState(false);
  const [showCondition, setShowCondition] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const [editName, setEditName] = useState(automation.name);
  const [currentStep, setCurrentStep] = useState(0);
  const [triggerInteracted, setTriggerInteracted] = useState(false);
  const [conditionInteracted, setConditionInteracted] = useState(false);

  // 简化的状态管理 - 只控制抽屉的显示
  React.useEffect(() => {
    // 每次切换自动化时，确保所有抽屉都关闭
    setShowTrigger(false);
    setShowCondition(false);
    setShowAction(false);
    setTriggerInteracted(false);
    setConditionInteracted(false);
  }, [automation.id]);

  // 检查是否已经开始配置
  const hasStarted = automation.trigger || automation.conditions.length > 0 || automation.actions.length > 0;
  
  // 检查是否显示动作配置面板 - 简化逻辑：只要有动作就显示
  const showActionPanel = automation.actions.length > 0;

  // 计算配置进度
  const steps = [
    { 
      id: 'trigger', 
      title: '设置触发器', 
      desc: '选择启动自动化的事件',
      icon: Zap,
      completed: !!automation.trigger,
      required: true
    },
    { 
      id: 'condition', 
      title: '添加条件', 
      desc: '设置执行条件（可选）',
      icon: Search,
      completed: automation.conditions.length > 0,
      required: false
    },
    { 
      id: 'action', 
      title: '执行动作', 
      desc: '定义要执行的操作',
      icon: Bot,
      completed: automation.actions.length > 0,
      required: true
    }
  ];

  const completedSteps = steps.filter(s => s.completed).length;
  const progress = (completedSteps / steps.filter(s => s.required).length) * 100;
  
  // 智能推荐下一步
  const getNextStep = () => {
    if (!automation.trigger) return 0;
    if (automation.actions.length === 0) return 2;
    return 1;
  };

  const nextStepIndex = getNextStep();

  // 只保留 handleOpenTrigger、handleOpenCondition、handleOpenAction，且只在点击时调用
  const handleOpenTrigger = () => {
    setShowTrigger(true);
    setShowCondition(false);
    setShowAction(false);
  };
  const handleOpenCondition = () => {
    setShowCondition(true);
    setShowTrigger(false);
    setShowAction(false);
  };
  const handleOpenAction = () => {
    setShowAction(true);
    setShowTrigger(false);
    setShowCondition(false);
  };

  // 模板导入逻辑
  const handleImportTemplate = (id: string) => {
    // 智能模板导入
    const templates: Record<string, any> = {
      'remind': {
        trigger: { type: 'field-modified', config: { field: 'status' } },
        conditions: [{ id: '1', type: 'field-equals', config: { field: 'status', value: 'completed' } }],
        actions: [{ id: '1', type: 'send-notification', config: { to: 'assignee', message: '任务已完成' } }]
      },
      'create-subtask': {
        trigger: { type: 'record-created', config: {} },
        conditions: [],
        actions: [{ id: '1', type: 'create-record', config: { content: '子任务' } }]
      }
    };
    
    const template = templates[id];
    if (template) {
      dispatch({ 
        type: 'UPDATE_AUTOMATION', 
        id: automationId, 
        automation: { 
          trigger: template.trigger,
          conditions: template.conditions,
          actions: template.actions
        } 
      });
      // 模板导入后关闭所有抽屉
      // closeAllDrawers(); // This function is no longer needed
    }
  };

  // 开始配置触发器 - 不自动打开编辑器
  const handleStartConfig = () => {
    // 只是标记开始配置，不自动打开任何编辑器
    setCurrentStep(0);
  };

  // 名称保存
  const handleNameSave = () => {
    dispatch({ type: 'UPDATE_AUTOMATION', id: automationId, automation: { name: editName } });
  };

  // 触发器保存
  const handleSaveTrigger = (trigger: any) => {
    dispatch({ type: 'UPDATE_AUTOMATION', id: automationId, automation: { trigger } });
    setShowTrigger(false);
    // 不再自动引导 currentStep
  };

  // 条件保存
  const handleSaveCondition = (conditions: any[]) => {
    dispatch({ type: 'UPDATE_AUTOMATION', id: automationId, automation: { conditions } });
    setShowCondition(false);
  };

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* 顶部名称和进度 */}
      <div className="mb-8 flex flex-col items-center">
        <input
          className="text-2xl font-bold border-none outline-none bg-transparent text-center mb-2 hover:bg-gray-50 rounded-lg px-4 py-2 transition-colors"
          placeholder="请输入工作流名称，如任务提醒"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onBlur={handleNameSave}
          onKeyDown={(e) => { if (e.key === 'Enter') handleNameSave(); }}
        />
        {hasStarted && (
          <div className="w-full max-w-2xl mt-4">
            {/* 进度条 */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">配置进度</span>
              <span className="text-sm font-medium text-blue-600">{completedSteps}/{steps.filter(s => s.required).length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            {/* 步骤指示器 */}
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300
                    ${step.completed 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : index === nextStepIndex 
                        ? 'bg-blue-500 border-blue-500 text-white animate-pulse' 
                        : 'bg-white border-gray-300 text-gray-400'
                    }
                  `}>
                    {step.completed ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                    {index === nextStepIndex && !step.completed && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-bounce" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      w-16 h-0.5 mx-2 transition-colors duration-300
                      ${steps[index + 1].completed || index < nextStepIndex ? 'bg-green-300' : 'bg-gray-300'}
                    `} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* 这里不再显示欢迎页和“开始创建”按钮 */}
      </div>

      {/* 主流程卡片区加 pr-[400px]，其余不变 */}
      <div className="flex-1 flex flex-col items-center gap-4 pr-[400px]">
        {/* 主流程卡片：触发器 */}
        <TriggerBlock onEdit={handleOpenTrigger} trigger={automation.trigger} />
        {/* 连接线和条件加号 */}
        <div className="flex flex-col items-center relative">
          <div className="w-px h-8 bg-gray-300"></div>
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-blue-300 shadow hover:bg-blue-50 hover:border-blue-500 text-blue-600 hover:text-blue-700 transition-all duration-200 absolute left-1/2 -translate-x-1/2 -top-4 z-10"
            title="添加条件判断"
            onClick={handleOpenCondition}
          >
            <Plus className="h-4 w-4" />
          </button>
          <div className="w-px h-8 bg-gray-300"></div>
          {/* 已添加条件提示 */}
          {automation.conditions.length > 0 && (
            <div className="text-xs text-blue-600 mt-2">已添加 {automation.conditions.length} 个条件</div>
          )}
        </div>
        {/* 主流程卡片：执行动作 */}
        <ActionBlock onEdit={handleOpenAction} actions={automation.actions} />
      </div>
      {/* 完成状态 */}
      {progress === 100 && (
        <div className="w-full max-w-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mt-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-green-900">自动化配置完成！</p>
              <p className="text-sm text-green-700">你的工作流程已准备就绪</p>
            </div>
          </div>
        </div>
      )}

      {/* 右侧设置面板，绝对定位在抽屉内部右侧 */}
      {showTrigger && (
        <div className="absolute right-0 top-0 h-full w-[400px] z-20 bg-white shadow-xl border-l">
          <TriggerEditor
            open={showTrigger}
            initial={automation.trigger}
            onClose={() => setShowTrigger(false)}
            onSave={handleSaveTrigger}
          />
        </div>
      )}
      {showCondition && (
        <div className="absolute right-0 top-0 h-full w-[400px] z-20 bg-white shadow-xl border-l">
          <ConditionEditor
            open={showCondition}
            initial={automation.conditions}
            onClose={() => setShowCondition(false)}
            onSave={handleSaveCondition}
          />
        </div>
      )}
      {showAction && (
        <div className="absolute right-0 top-0 h-full w-[400px] z-20 bg-white shadow-xl border-l">
          <ActionEditor
            open={showAction}
            initial={automation.actions}
            onClose={() => setShowAction(false)}
            onSave={actions => {
              dispatch({ type: 'UPDATE_AUTOMATION', id: automationId, automation: { actions } });
              setShowAction(false);
            }}
          />
        </div>
      )}
    </div>
  );
} 