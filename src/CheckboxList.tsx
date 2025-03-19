import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

interface ChildItem {
  id: number;
  label: string;
  description: string;
}
interface ParentItem {
  id: number;
  label: string;
  children: ChildItem[];
}

// Mock data
const mockData: ParentItem[] = [
  {
    id: 1,
    label: '2025-02-25',
    children: [
      { id: 1, label: 'under0', description: 'prep.在......之下; 在........' },
      { id: 2, label: 'under1', description: 'prep.在......之下; 在........' },
      { id: 3, label: 'under2', description: 'prep.在......之下; 在........' },
      { id: 4, label: 'under3', description: 'prep.在......之下; 在........' },
      { id: 5, label: 'under4', description: 'prep.在......之下; 在........' },
      { id: 6, label: 'under5', description: 'prep.在......之下; 在........' },
      { id: 7, label: 'under6', description: 'prep.在......之下; 在........' },
      { id: 8, label: 'under7', description: 'prep.在......之下; 在........' },
      { id: 9, label: 'under8', description: 'prep.在......之下; 在........' },
    ],
  },
  {
    id: 2,
    label: '2025-02-26',
    children: [
      { id: 1, label: 'under0under0', description: 'prep.在......之下; 在........' },
      { id: 2, label: 'under1under1', description: 'prep.在......之下; 在........' },
      { id: 3, label: 'under2under2', description: 'prep.在......之下; 在........' },
      { id: 4, label: 'under3under3', description: 'prep.在......之下; 在........' },
      { id: 5, label: 'under4under4', description: 'prep.在......之下; 在........' },
    ],
  },
];

const CheckboxList = () => {
  return (
    <div className="mx-auto w-96">
      {mockData.map((parent) => (
        <Accordion
          type="single"
          collapsible
          key={parent.id}
        >
          <AccordionItem value={`item-${parent.id}`}>
            <AccordionTrigger>
              <div className="flex items-center justify-between w-full ">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={`group-${parent.id}`}
                    checked
                    data-state={'checked'}
                    onCheckedChange={(checked) => checked}
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
                <span className="text-xs text-gray-500 ">共 {parent?.children.length || 0} 个</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {parent.children.map((child) => (
                <div
                  key={child.id}
                  className="flex items-center space-x-3 py-3 border-b"
                >
                  <Checkbox
                    id={`child-${parent.id}-${child.id}`}
                    checked
                    onCheckedChange={(checked) => checked}
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
