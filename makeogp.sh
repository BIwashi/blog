if [ $# != 1 ] || [ $1 = "" ]; then
    echo "One parameters are required"
    echo ""
    echo "string: path to markdown file of target post"
    echo ""
    echo "example command"
    echo "\t$ sh ./scripts/gen_ogp.sh ./content/post/test/test.md"
    exit
fi

TARGET_POST_PATH=$1

tcardgen \
    --fontDir ./static/fonts/Kinto_Sans \
    --output static/images/og \
    --template static/ogp/template.png \
    --config tcardgen.yaml \
    $TARGET_POST_PATH
