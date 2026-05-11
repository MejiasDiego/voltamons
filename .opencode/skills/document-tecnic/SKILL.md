---
name: document-tecnic
description: Genera documents tècnics exhaustius en català per a projectes de programació web (frontend/backend). Inclou portada professional, taula de continguts, seccions numerades amb estils i marcadors d'imatges.
license: MIT
compatibility: opencode
metadata:
  language: catala
  audience: professors/desenvolupadors
  format: word-docx
---

## Identificacio del Skill

Aquest skill genera documents tècnics exhaustius escrits **exclusivament en català** per a projectes de programació web (frontend i/o backend). El document està pensat per presentar a professors que han d'avaluar un projecte de programació.

El document generat tindrà format professional amb:
- Portada amb camps separats (titol, autor, institut, professors, data)
- Taula de continguts
- Seccions i subseccions amb estils de titol
- Llistes amb vinyetes
- Salts de pagina entre seccions principals
- Notes per a imatges

---

## Quan fer-lo servir

Utilitza aquest skill quan:
- L'usuari demani un document tècnic per a un projecte de programació
- Es necessiti justificar decisions tècniques preses en el desenvolupament
- Es vulgui documentar l'estat, arquitectura o decisions d'un projecte
- El document hagi de ser llegible per professors o equips tècnics

---

## Abans de generar: Preguntes essentials

Si l'usuari no proporciona aquesta informacio, pregunta:

1. **Nom de l'autor** - Qui ha fet el projecte?
2. **Nom de l'institut/centre** - On s'ha fet?
3. **Noms dels professors** - Qui avaluara?
4. **Tecnologies utilitzades** - Que stack s'ha fet servir?
5. **Audiència del document** - Professors, equips tècnics, etc.?
6. **Nom del projecte** - Quin es el nom del projecte?

---

## Procés de generació (MÈTODE RECOMANAT)

Per generar un document amb format professional, seguir aquests passos:

### Pas 1: Generar l'script Python

Crear un arxiu `format_document.py` a l'arrel del projecte amb l'estructura següent:

```python
from docx import Document
from docx.shared import Pt, Inches, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
import docx.enum.text

# Configuracio
DOCUMENT_TITLE = "[TITOL DEL PROJECTE]"
AUTHOR = "[Nom de l'autor]"
INSTITUTE = "[Nom de l'institut]"
PROFESSORS = "[Noms dels professors]"
DATE = "[Data actual]"

def create_cover_page(doc):
    # Espais en blanc per centrar
    for _ in range(8):
        doc.add_paragraph()

    # Titol principal
    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = title.add_run(DOCUMENT_TITLE)
    run.bold = True
    run.font.size = Pt(32)

    # Subtitol
    subtitle = doc.add_paragraph()
    subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = subtitle.add_run("Document Tècnic")
    run.font.size = Pt(18)

    # Taula amb dades
    table = doc.add_table(rows=5, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER

    data = [
        ("Autor:", AUTHOR),
        ("Institut:", INSTITUTE),
        ("Professors:", PROFESSORS),
        ("Data:", DATE),
        ("", "")
    ]

    for i, (label, value) in enumerate(data):
        cell_label = table.cell(i, 0)
        cell_value = table.cell(i, 1)

        if label:
            run = cell_label.paragraphs[0].add_run(label)
            run.bold = True
            cell_label.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.RIGHT
            cell_label.width = Inches(1.5)

            run = cell_value.paragraphs[0].add_run(value)
            cell_value.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.LEFT
            cell_value.width = Inches(4)

    doc.add_page_break()

def create_section(doc, title):
    return doc.add_heading(title, level=1)

def add_subsection(doc, title):
    return doc.add_heading(title, level=2)

def add_content(doc, text):
    for line in text.split('\n'):
        line = line.strip()
        if line:
            doc.add_paragraph(line)

def add_bullet_list(doc, items):
    for item in items:
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.left_indent = Inches(0.5)
        p.add_run(item)

def main():
    doc = Document()

    # Configurar marges
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1.25)
        section.right_margin = Inches(1.25)

    create_cover_page(doc)

    # CONTINGUT DEL DOCUMENT
    # Crear seccions aqui...

    doc.save("Documentacio_Tecnica.docx")
    print("Document creat!")

if __name__ == "__main__":
    main()
```

### Pas 2: Generar el contingut estructurat

Afegir el contingut seguint l'estructura:

1. **Portada** - Dades de l'autor i projecte
2. **Taula de Continguts** - Llista de seccions
3. **Seccio 1: Introduccio** - Descripcio, objectius, abast
4. **Seccio 2: Stack Tecnologic** - Per cada tecnologia
5. **Seccio 3: Arquitectura** - Estructura, flux, patrons
6. **Seccio 4: Decisions Tecniques** - Problema, solucio, justificacio
7. **Seccio 5: Funcionalitats** - Llista i detalls
8. **Seccio 6: Desplegament** - Requisits, eines, instruccions
9. **Seccio 7: Conclusions** - Avaluacio, aprenentatges, millores
10. **Seccio 8: Referencies** - Documentacio, eines, enllaços

### Pas 3: Executar l'script

```bash
uv pip install python-docx
python format_document.py
```

---

## Estructura del document

### PORTADA

La portada professional inclou:
- Espais en blanc per centering
- Titol del projecte en majuscules, centrat, gran
- Subtitol "Document Tècnic"
- Taula amb dos columns: etiqueta (negreta) | valor
- Autor, Institut, Professors, Data

### TAULA DE CONTINGUTS

Numeracio de les 8 seccions principals.

### SECCIO 1: INTRODUCCIO

- 1.1 Descripcio del Projecte
- 1.2 Objectius
- 1.3 Abast

### SECCIO 2: STACK TECNOLOGIC

Per cada tecnologia utilitzada (subseccio 2.X):
- Nom i versio
- Per què s'ha triat aquesta tecnologia
- Alternatives considerades (si escau)

### SECCIO 3: ARQUITECTURA DEL SISTEMA

- 3.1 Estructura de Carpetes
- 3.2 Diagrama de l'Arquitectura
- 3.3 Flux de Dades
- 3.4 Patrons de Disseny

### SECCIO 4: DECISIONES TECNIQUES

Per cada decisio important (subseccio 4.X):
- Problema que es resol
- Solucio implementada
- Justificacio de la decisio
- Alternatives descartades i per què

### SECCIO 5: FUNCIONALITATS IMPLEMENTADES

Per cada funcionalitat (subseccio 5.X):
- Descripcio
- Decisions de UX/UI

### SECCIO 6: DESPLREGAMENT

- 6.1 Requisits per Executar
- 6.2 Eines de Desplegament
- 6.3 Instruccions de Desplegament
- 6.4 Consideracions de Seguretat
- 6.5 Limitacions Conegudes

### SECCIO 7: CONCLUSIONS I TREBALL FUTUR

- 7.1 Avaluacio dels Objectius
- 7.2 Aprenentatges
- 7.3 Possibles Millores
- 7.4 Valoracio Final

### SECCIO 8: REFERENCIES

- 8.1 Documentacio de Tecnologies
- 8.2 Eines Utilitzades
- 8.3 Estandards
- 8.4 Repositori del Projecte

---

## Funcions helpers per a Python-docx

### Crear portada

```python
def create_cover_page(doc):
    for _ in range(8):
        doc.add_paragraph()

    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = title.add_run("TITOL")
    run.bold = True
    run.font.size = Pt(32)

    subtitle = doc.add_paragraph()
    subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = subtitle.add_run("Document Tècnic")
    run.font.size = Pt(18)

    table = doc.add_table(rows=5, cols=2)
    # ... configuracio de la taula

    doc.add_page_break()
```

### Crear seccio (titol 1)

```python
def create_section(doc, title):
    return doc.add_heading(title, level=1)
```

### Crear subseccio (titol 2)

```python
def add_subsection(doc, title):
    return doc.add_heading(title, level=2)
```

### Afegir contingut (paragrafs)

```python
def add_content(doc, text):
    for line in text.split('\n'):
        line = line.strip()
        if line:
            doc.add_paragraph(line)
```

### Afegir llista amb vinyetes

```python
def add_bullet_list(doc, items):
    for item in items:
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.left_indent = Inches(0.5)
        p.add_run(item)
```

---

## Format del contingut

- **Idioma**: Català estrictament
- **Títols de secció**: Majuscules o capitalitzats (Heading 1)
- **Subtítols**: Numeracio 1.X (Heading 2)
- **Paràgrafs**: Separats per linies en blanc
- **Codi**: Bloc de codi amb font Courier New
- **Llistes**: Amb vinyetes natives de Word

---

## Marcadors d'imatges

Quan es necessiti una imatge o captura, utilitzar:

```
[Imatge 1: Descripcio de la imatge]
[Imatge 2: Diagrama d'arquitectura]
```

L'usuari omplira les imatges reals posteriorment.

---

## Consells finals

- Demanar confirmacio a l'usuari abans de generar si falta informacio
- Ser exhaustiu però concís
- Justificar TOTA decisio tecnica amb raons
- Mai inventar detalls tecnics que l'usuari no hagi proporcionat
- Utilitzar Python-docx per a format professional (MÈTODE RECOMANAT)
- Despres de generar, obrir el document per verificar que tot es correcte

---

## Configuracio MCP per a OpenCode

Si el projecte no té un arxiu `opencode.json`, l'agent l'ha de crear per habilitar el MCP Office. Això permet generar documents Word directament des d'OpenCode.

### Contingut de l'opencode.json

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "office": {
      "type": "local",
      "command": ["uvx", "mcp-server-office"],
      "enabled": true
    }
  }
}
```

### Pas previ: Instalacio d'uvx

L'agent ha d'assegurar-se que `uv` (i per tant `uvx`) està instal·lat al sistema. Si no ho està, pot suggerir:

```powershell
irm https://astral.sh/uv/install.ps1 | iex
```

o

```powershell
winget install --id=astral-sh.uv -e
```

### Eines disponibles amb el MCP Office

Quan el MCP Office està configurat:
- `office_write_docx` - Crear documents Word
- `office_read_docx` - Llegir documents Word
- `office_edit_docx_paragraph` - Editar paràgrafs
- `office_edit_docx_insert` - Inserir paràgrafs

---

## Dependéncies

Per generar documents amb format professional (mètode recomanat):

```bash
pip install python-docx
# o
uv pip install python-docx
```

També es pot utilitzar el MCP Office, però amb limitacions de format.
