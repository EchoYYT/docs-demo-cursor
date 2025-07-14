import React, { useState } from 'react';
import { useAutomation, AutomationItem } from './AutomationContext';
import { TriggerBlock } from './TriggerBlock';
import { ConditionBlock } from './ConditionBlock';
import { ActionBlock } from './ActionBlock';
import { TemplateBlock } from './TemplateBlock';
import { TriggerEditor } from './TriggerEditor';
import { ConditionEditor } from './ConditionEditor';
import { ActionEditor } from './ActionEditor';
import { Button } from '../ui/button';
import { Plus, Zap, Search, Bot, Check, ChevronRight, Sparkles, Clock, Users, Target } from 'lucide-react';

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
  const [hasAddedAction, setHasAddedAction] = useState(automation.actions.length > 0);
  const [editName, setEditName] = useState(automation.name);
  const [currentStep, setCurrentStep] = useState(0);

  // 确保 showAction 只在用户明确点击时才为 true
  React.useEffect(() => {
    setShowAction(false);
  }, [automation.id]);

  // 检查是否已经开始配置
  const hasStarted = automation.trigger || automation.conditions.length > 0 || automation.actions.length > 0;
  
  // 检查是否显示动作配置面板
  const showActionPanel = hasAddedAction;

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
  
  // 添加执行动作
  const handleAddAction = () => {
    setHasAddedAction(true);
    // 确保不会自动打开 ActionEditor
    setShowAction(false);
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
      setHasAddedAction(true);
      // 确保不会自动打开 ActionEditor
      setShowAction(false);
    }
  };

  // 开始配置触发器
  const handleStartConfig = () => {
    setShowTrigger(true);
    setCurrentStep(0);
    // 确保不会自动打开 ActionEditor
    setShowAction(false);
  };

  // 名称保存
  const handleNameSave = () => {
    dispatch({ type: 'UPDATE_AUTOMATION', id: automationId, automation: { name: editName } });
  };

  // 触发器保存
  const handleSaveTrigger = (trigger: any) => {
    dispatch({ type: 'UPDATE_AUTOMATION', id: automationId, automation: { trigger } });
    setShowTrigger(false);
    // 确保不会自动打开 ActionEditor
    setShowAction(false);
    // 智能引导到下一步
    if (automation.actions.length === 0) {
      setTimeout(() => setCurrentStep(2), 300);
    }
  };

  // 条件保存
  const handleSaveCondition = (conditions: any[]) => {
    dispatch({ type: 'UPDATE_AUTOMATION', id: automationId, automation: { conditions } });
    setShowCondition(false);
    // 确保不会自动打开 ActionEditor
    setShowAction(false);
  };

  // 动作保存
  const handleSaveAction = (actions: any[]) => {
    dispatch({ type: 'UPDATE_AUTOMATION', id: automationId, automation: { actions } });
    setShowAction(false);
    if (actions.length === 0) {
      setHasAddedAction(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
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
        
        {!hasStarted && (
          <div className="text-sm text-gray-500 mt-2">当发生什么事 → 如果满足某条件 → 执行某动作</div>
        )}
      </div>

      {!hasStarted ? (
        // 欢迎界面 - 参考 Airtable 的引导设计
        <div className="flex flex-col items-center">
          <div className="w-full max-w-2xl bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg border border-blue-100 px-8 py-12 mb-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">AI</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">创建智能自动化</h3>
              <p className="text-gray-600 mb-6">让 AI 帮你自动处理重复性工作，提升团队效率</p>
              
              <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                <div className="flex flex-col items-center p-3 bg-white/50 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-500 mb-2" />
                  <span className="font-medium">节省时间</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white/50 rounded-lg">
                  <Users className="h-6 w-6 text-green-500 mb-2" />
                  <span className="font-medium">团队协作</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white/50 rounded-lg">
                  <Target className="h-6 w-6 text-purple-500 mb-2" />
                  <span className="font-medium">精准执行</span>
                </div>
              </div>
              
              <Button 
                onClick={handleStartConfig} 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                开始创建
              </Button>
            </div>
          </div>
          
          {/* 智能模板推荐 */}
          <TemplateBlock onImport={handleImportTemplate} />
        </div>
      ) : (
        // 配置界面 - 参考 Monday 的卡片式设计
        <div className="flex flex-col items-center gap-6">
          {/* 智能提示卡片 */}
          {nextStepIndex < steps.length && (
            <div className="w-full max-w-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    下一步：{steps[nextStepIndex].title}
                  </p>
                  <p className="text-xs text-blue-700">{steps[nextStepIndex].desc}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* 配置块 */}
          <div className="w-full flex flex-col items-center gap-4">
            <TriggerBlock onEdit={() => setShowTrigger(true)} trigger={automation.trigger} />
            
            {/* 连接线 */}
            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-px h-6 bg-gray-300"></div>
            </div>
            
            <ConditionBlock onEdit={() => setShowCondition(true)} conditions={automation.conditions} />
            
            {/* 连接线 */}
            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-px h-6 bg-gray-300"></div>
            </div>
            
            {showActionPanel ? (
              <ActionBlock onEdit={() => setShowAction(true)} actions={automation.actions} />
            ) : (
              <div className="w-full max-w-2xl flex justify-center">
                <Button 
                  onClick={handleAddAction}
                  variant="outline" 
                  className="border-dashed border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50 text-blue-600 hover:text-blue-700 px-8 py-6 rounded-xl transition-all duration-200"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  添加执行动作
                </Button>
              </div>
            )}
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
        </div>
      )}

      {/* 编辑器抽屉 */}
      <TriggerEditor
        open={showTrigger}
        initial={automation.trigger}
        onClose={() => setShowTrigger(false)}
        onSave={handleSaveTrigger}
      />
      <ConditionEditor
        open={showCondition}
        initial={automation.conditions}
        onClose={() => setShowCondition(false)}
        onSave={handleSaveCondition}
      />
      <ActionEditor
        open={showAction}
        initial={automation.actions}
        onClose={() => setShowAction(false)}
        onSave={handleSaveAction}
      />
    </div>
  );
} 