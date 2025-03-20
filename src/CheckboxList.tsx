import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { enableMapSet, produce } from 'immer'
import { useState } from 'react';
import { useCallback } from 'react';

enableMapSet()

interface ChildItem {
  id: string;
  label: string;
  description: string;
}
interface ParentItem {
  id: string;
  label: string;
  children: ChildItem[];
}

// Mock data
const mockData: ParentItem[] = [
  {
    id: '1',
    label: '2025-02-25',
    children: [
      { id: '1-1', label: 'under0', description: 'prep.在......之下; 在........' },
      { id: '1-2', label: 'under1', description: 'prep.在......之下; 在........' },
      { id: '1-3', label: 'under2', description: 'prep.在......之下; 在........' },
      { id: '1-4', label: 'under3', description: 'prep.在......之下; 在........' },
      { id: '1-5', label: 'under4', description: 'prep.在......之下; 在........' },
      { id: '1-6', label: 'under5', description: 'prep.在......之下; 在........' },
      { id: '1-7', label: 'under6', description: 'prep.在......之下; 在........' },
      { id: '1-8', label: 'under7', description: 'prep.在......之下; 在........' },
      { id: '1-9', label: 'under8', description: 'prep.在......之下; 在........' },
    ],
  },
  {
    id: '2',
    label: '2025-02-26',
    children: [
      { id: '2-1', label: 'under0under0', description: 'prep.在......之下; 在........' },
      { id: '2-2', label: 'under1under1', description: 'prep.在......之下; 在........' },
      { id: '2-3', label: 'under2under2', description: 'prep.在......之下; 在........' },
      { id: '2-4', label: 'under3under3', description: 'prep.在......之下; 在........' },
      { id: '2-5', label: 'under4under4', description: 'prep.在......之下; 在........' },
    ],
  },
];


const getCheckedList = (data: typeof mockData, set: Set<string>) => {
  const checkedList: (typeof mockData)[number]['children'] = []

  data.forEach((item) => {
    item.children.forEach((child) => {
      if (set.has(child.id)) {
        checkedList.push(child)
      }
    })
  })

  return checkedList
}

const CheckboxList = ({
  onChildSelectChange,
}: {
  onChildSelectChange: (checkedList: (typeof mockData)[number]['children']) => void
}) => {
  const [checkedList, setCheckedList] = useState(new Set<string>())

  const handleMainItemChange = useCallback(
    (item: (typeof mockData)[number]) => (checked: boolean) => {
      if (checked) {
        // 如果主列表项选中, 则选中所有子列表项
        setCheckedList(
          produce((prev) => {
            prev.add(item.id)
            item.children.forEach((child) => {
              prev.add(child.id)
            })
            onChildSelectChange?.(getCheckedList(mockData, prev))
          })
        )
      } else {
        // 如果主列表项未选中, 则取消选中所有子列表项
        setCheckedList(
          produce((prev) => {
            prev.delete(item.id)
            item.children.forEach((child) => {
              prev.delete(child.id)
            })
            onChildSelectChange?.(getCheckedList(mockData, prev))
          })
        )
      }
    },
    [onChildSelectChange]
  )

  const handleChildItemChange = useCallback(
    (
      child: (typeof mockData)[number]['children'][number],
      item: (typeof mockData)[number]
    ) =>
      (checked: boolean) => {
        if (checked) {
          setCheckedList(
            produce((prev) => {
              prev.add(child.id)
              // 如果子列表项全选中, 则选中主列表项
              if (item.children.every((_child) => prev.has(_child.id))) {
                prev.add(item.id)
              }
              onChildSelectChange?.(getCheckedList(mockData, prev))
            })
          )
        } else {
          setCheckedList(
            produce((prev) => {
              prev.delete(child.id)
              // 同时取消选中主列表项
              prev.delete(item.id)
              onChildSelectChange?.(getCheckedList(mockData, prev))
            })
          )
        }
      },
    [onChildSelectChange]
  )

  return (
    <div className="mx-auto w-96">
      {mockData.map((parent) => (
        <Accordion
          type="single"
          collapsible
          key={parent.id}
        >
          <AccordionItem value={`item-${parent.id}`}>
              <div className="flex items-center justify-between w-full ">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={`group-${parent.id}`}
                    checked={checkedList.has(parent.id)}
                    data-state={checkedList.has(parent.id) ? 'checked' : 'unchecked'}
                    onCheckedChange={handleMainItemChange(parent)}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-full"
                  />
                  <label
                    htmlFor={`group-${parent.id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {parent.label}
                  </label>
                </div>
            <AccordionTrigger>
                <span className="text-xs text-gray-500 ">共 {parent?.children.length || 0} 个</span>
            </AccordionTrigger>
              </div>
            <AccordionContent>
              {parent.children.map((child) => (
                <div
                  key={child.id}
                  className="flex items-center space-x-3 py-3 border-b"
                >
                  <Checkbox
                    id={`child-${parent.id}-${child.id}`}
                    checked={checkedList.has(child.id)}
                    onCheckedChange={handleChildItemChange(child, parent)}
                    className="rounded-full"
                  />
                  <div className="flex justify-between w-full">
                    <label
                      htmlFor={`child-${parent.id}-${child.id}`}
                      className="text-sm font-medium"
                    >
                      {child.label}
                    </label>
                    <span className="text-xs text-gray-500">{child.description}</span>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default CheckboxList;
