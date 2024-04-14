import json

def convert_to_echarts_format(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    nodes = []
    links = []
    categories = []
    category_map = {}
    max_size = 70
    min_size = 20

    for record in data:
        n = record['n']
        m = record['m']
        r = record['r']

        for node in [n, m]:
            category = node['labels'][0] if node['labels'] else None
            if category and category not in category_map:
                category_map[category] = len(categories)
                categories.append({'name': category})

        nodes.append({
            'id': str(n['identity']),
            'name': n['properties']['name'],
            'symbolSize': max_size if 'root' in n['labels'] else min_size,
            'category': category_map.get(n['labels'][0]) if n['labels'] else None
        })

        nodes.append({
            'id': str(m['identity']),
            'name': m['properties']['name'],
            'symbolSize': min_size,
            'category': category_map.get(m['labels'][0]) if m['labels'] else None
        })

        links.append({
            'source': str(r['start']),
            'target': str(r['end']),
            'name': r['type']
        })

    # Remove duplicate nodes
    nodes = [dict(t) for t in set(tuple(d.items()) for d in nodes)]

    return {'nodes': nodes, 'links': links, 'categories': categories}


if __name__ == '__main__':
    data = convert_to_echarts_format('graph.json')
    with open('echarts_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
