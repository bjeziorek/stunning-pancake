import { t } from "i18next"
import { TagIcon } from "lucide-react";
import { Badge, Button, Flex, Tooltip } from "@radix-ui/themes";
import type { TableColumnsColumns } from "@/shared/components/table/types/columns";
import { loadModel } from "@/mockData/utils/loadModel";


export interface FiltersMock {
  query: string
  status: string
  type: string
  tag: string
  baseModel: string
  loraMin: string
  loraMax: string
  sizeMin: string
  sizeMax: string
}


export const filterMock:FiltersMock = {
        query: "",  
        status: "",    
        type: "",       
        tag: "",          
        baseModel: "",   
        loraMin: "",    
        loraMax: "",     
        sizeMin: "",     
        sizeMax: "",    
    };

 export const defaultFilters:FiltersMock = {
        query: "",
        status: "",
        type: "",
        tag: "",
        baseModel: "",
        loraMin: "",
        loraMax: "",
        sizeMin: "",
        sizeMax: "",
    };

export const newData:NewData[] = [
  {
    "id": 1,
    "name": "Vision Encoder v3",
    "description": "Model do ekstrakcji cech z obrazów.",
    "baseModel": "resnet50",
    "version": "3.2.1",
    "loraCount": 1,
    "status": "ready",
    "type": "vision",
    "tags": ["vision", "encoder"],
    "size": "98M",
    "details": "Model zoptymalizowany do szybkiej ekstrakcji cech."
  },
  {
    "id": 2,
    "name": "GPT‑Mini Chat",
    "description": "Lekki model do czatu.",
    "baseModel": "gpt-mini",
    "version": "1.0.0",
    "loraCount": 0,
    "status": "loading",
    "type": "chat",
    "tags": ["chat", "lightweight"],
    "size": "45M",
    "details": "Szybki model do krótkich odpowiedzi."
  },
  {
    "id": 3,
    "name": "Audio Transcriber XL",
    "description": "Model do transkrypcji audio.",
    "baseModel": "wav2vec2",
    "version": "2.4.0",
    "loraCount": 3,
    "status": "ready",
    "type": "audio",
    "tags": ["audio", "transcription"],
    "size": "310M",
    "details": "Wysoka dokładność transkrypcji mowy."
  },
  {
    "id": 4,
    "name": "GPT‑2 Polish",
    "description": "GPT‑2 dostrojony do języka polskiego.",
    "baseModel": "gpt2",
    "version": "1.3.0",
    "loraCount": 2,
    "status": "ready",
    "type": "causal-lm",
    "tags": ["polish", "nlp"],
    "size": "355M",
    "details": "Model zoptymalizowany pod zadania NLP w języku polskim."
  },
  {
    "id": 5,
    "name": "Sentiment Analyzer v2",
    "description": "Model do analizy sentymentu.",
    "baseModel": "bert-base",
    "version": "2.0.0",
    "loraCount": 1,
    "status": "ready",
    "type": "classification",
    "tags": ["nlp", "sentiment"],
    "size": "110M",
    "details": "Wysoka skuteczność w klasyfikacji emocji."
  },
  {
    "id": 6,
    "name": "CodeGen Small",
    "description": "Model generujący kod.",
    "baseModel": "codegen-350M",
    "version": "1.0.2",
    "loraCount": 0,
    "status": "loading",
    "type": "code",
    "tags": ["code", "generation"],
    "size": "350M",
    "details": "Model do generowania prostych fragmentów kodu."
  },
  {
    "id": 7,
    "name": "Image Captioner",
    "description": "Model opisujący obrazy.",
    "baseModel": "vit-gpt2",
    "version": "1.1.0",
    "loraCount": 2,
    "status": "ready",
    "type": "vision-language",
    "tags": ["vision", "nlp"],
    "size": "220M",
    "details": "Generuje opisy obrazów wysokiej jakości."
  },
  {
    "id": 8,
    "name": "Speech Emotion Detector",
    "description": "Model wykrywający emocje w głosie.",
    "baseModel": "wav2vec2",
    "version": "1.0.0",
    "loraCount": 1,
    "status": "ready",
    "type": "audio",
    "tags": ["audio", "emotion"],
    "size": "180M",
    "details": "Analizuje ton głosu i klasyfikuje emocje."
  },
  {
    "id": 9,
    "name": "GPT‑Lite",
    "description": "Ultralekki model językowy.",
    "baseModel": "gpt-lite",
    "version": "0.9.0",
    "loraCount": 0,
    "status": "ready",
    "type": "causal-lm",
    "tags": ["lightweight", "nlp"],
    "size": "22M",
    "details": "Bardzo szybki model do prostych zadań NLP."
  },
  {
    "id": 10,
    "name": "Toxicity Classifier",
    "description": "Model wykrywający toksyczne treści.",
    "baseModel": "bert-base",
    "version": "1.4.0",
    "loraCount": 2,
    "status": "ready",
    "type": "classification",
    "tags": ["nlp", "moderation"],
    "size": "120M",
    "details": "Wysoka skuteczność w moderacji treści."
  }
]

export interface NewData {
  id: number
  name: string
  description: string
  baseModel: string
  version: string
  loraCount: number
  status: "ready" | "loading"
  type: string
  tags: string[]
  size: string
  details: string
}

    export const tagColor = (tag: string) => {
        if (tag.includes("coding")) return "blue";
        if (tag.includes("chat")) return "green";
        if (tag.includes("math")) return "purple";
        if (tag.includes("polish")) return "red";
        return "gray";
    };

export const newDataColumns: TableColumnsColumns<NewData> = [
  {
    id: "name",
    label: "Name",
    visible: true,
    render: (model) => t(model.name)
  },
  {
    id: "description",
    label: "Description",
    visible: true,
    render: (model) => model.description
  },
  {
    id: "baseModel",
    label: "Base Model",
    visible: true,
    render: (model) => model.baseModel
  },
  {
    id: "version",
    label: "Version",
    visible: true,
    render: (model) => model.version
  },
  {
    id: "loraCount",
    label: "LoRA Count",
    visible: true,
    render: (model) => model.loraCount
  },
  {
    id: "status",
    label: "Status",
    visible: true,
    render: (model) => (
      <Badge color={model.status === "ready" ? "green" : "amber"}>
        {model.status}
      </Badge>
    )
  },
  {
    id: "actions",
    label: "Actions",
    visible: true,
    render: (model) => (
      <Button
        disabled={model.status !== "ready"}
        variant="soft"
        onClick={() => loadModel(model.id.toString())}
      >
        Load
      </Button>
    )
  },
  {
    id: "id",
    label: "ID",
    visible: true,
    render: (model) => model.id
  },
  {
    id: "type",
    label: "Type",
    visible: true,
    render: (model) => model.type
  },
  {
    id: "size",
    label: "Size",
    visible: true,
    render: (model) => t(model.size)
  },
  {
    id: "details",
    label: "Details",
    visible: true,
    render: (model) => model.details
  },
  {
    id: "tags",
    label: "Tags",
    visible: true,
    render: (model) => (
      <Flex gap="2" wrap="wrap">
        {model.tags.map((tag) => (
          <Tooltip key={tag} content={tag}>
            <Badge
              key={tag}
              variant="soft"
              radius="full"
              color={tagColor(tag)}
            >
              <TagIcon size={12} />
              {tag}
            </Badge>
          </Tooltip>
        ))}
      </Flex>
    )
  }
]