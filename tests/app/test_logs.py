import logging

from sally.app.logs import TruncatedFormatter


def test_truncated_formatter_does_not_mutate_shared_record():
    record = logging.LogRecord(
        name="sally",
        level=logging.INFO,
        pathname="/tmp/long_module_name.py",
        lineno=42,
        msg="hello",
        args=(),
        exc_info=None,
        func="very_long_function_name",
    )
    formatter = TruncatedFormatter(
        "%(module)s|%(funcName)s|%(lineno)s|%(message)s"
    )

    rendered = formatter.format(record)

    assert rendered == "long_modul|very_long_func|   42|hello"
    assert record.module == "long_module_name"
    assert record.funcName == "very_long_function_name"
    assert record.lineno == 42
