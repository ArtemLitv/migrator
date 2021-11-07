# Конечный результат (*для пользователя*)
## Стандартное обновление либы на последнюю актуальную
```bash
npx migrator --config <lib_name>
```
## Миграция на конкретную версию либы
```bash
npx migrator --config <lib_name> --move 3.0.0:4.0.0
```
## Миграция с кастомным конфигом
```bash
npx migrator --config ./migrator-configs
```
В папке `./migrator-configs` находится файлы конфигураций `yaml` кастомные `селекторы` и `правила`


# Селектор
Селектор - место где применяется правило

типы селекторов:
* селектор файла .component.html, *, .ts
* селектор текста (конкретный тег button)

# Rule
rule - правило, по которому изменяется текст

типы rule:
* простые:
  * `CHANGE find_str TO replace_str`
  * `DELETE find_str`
  * `ADD added_str`
* с условием
  * `CHANGE [kind]="'primary'" TO [type]="'primary'" IF CONTAIN str`

## Условие
для каждого из типов rule можно добавить условие `IF expression`, `IF NOT expression`

```yaml
rules:
  - CHANGE [kind]="'primary'" TO [type]="'primary'" IF CONTAIN str
  - ADD [kind]="'secondary'" IF NOT CONTAIN [kind]="'primary'"
```
