function wrap(text) {
    text.each(function() {
        var text = d3.select(this);
        var words = text.text().split(/\s+/).reverse();
        var lineHeight = 20;
        var width = parseFloat(text.attr('width'));
        var y = parseFloat(text.attr('y'));
        var x = text.attr('x');
        var anchor = text.attr('text-anchor');
    
        var tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('text-anchor', anchor);
        var lineNumber = 0;
        var line = [];
        var word = words.pop();

        while (word) {
            line.push(word);
            tspan.text(line.join(' '));
            if (tspan.node().getComputedTextLength() > width) {
                lineNumber += 1;
                line.pop();
                tspan.text(line.join(' '));
                line = [word];
                tspan = text.append('tspan').attr('x', x).attr('y', y + lineNumber * lineHeight).attr('anchor', anchor).text(word);
            }
            word = words.pop();
        }
    });
}

function dotme(text) {
    text.each(function() {
        var text = d3.select(this);
        var words = text.text().split(/\s+/);
        
        var ellipsis = text.text('').append('tspan').attr('class', 'elip').text('...');
        var width = parseFloat(text.attr('width')) - ellipsis.node().getComputedTextLength();
        var numWords = words.length;
        
        var tspan = text.insert('tspan', ':first-child').text(words.join(' '));
        
        // Try the whole line
        // While it's too long, and we have words left, keep removing words
        
        while (tspan.node().getComputedTextLength() > width && words.length) {
            words.pop();
            tspan.text(words.join(' '));
        }
        
        if (words.length === numWords) {
            ellipsis.remove();
        }
    });
}

d3.selectAll('.wrapme').call(wrap);
d3.selectAll('.dotme').call(dotme);
